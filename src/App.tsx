import { useState, useEffect, useMemo } from 'react'
import AddTodo from './AddTodo'
import TodosList from './TodoList'
import ArchiveList from './ArchiveList'
import type { Todo } from './types'

function parseTodos(raw: string | null): Todo[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map((t: any) => ({
      id: t.id ?? t.createdAt ?? Date.now(),
      createdAt: t.createdAt ?? Date.now(),
      title: String(t.title ?? ''),
      isCompleted: Boolean(t.isCompleted),
      isArchive: Boolean(t.isArchive),
    }))
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Failed to parse todos from localStorage', e)
    return []
  }
}

export default function App(){
  const [todos, setTodos] = useState<Todo[]>(() => parseTodos(localStorage.getItem('todos')))

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos))
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save todos to localStorage', e)
    }
  }, [todos])

  // Defensive: if `todos` ever becomes non-array (due to a bug or bad data), reset it and log for debugging
  useEffect(() => {
    if (!Array.isArray(todos)) {
      // eslint-disable-next-line no-console
      console.warn('Todos state is not an array. Resetting to an empty array.', todos)
      setTodos([])
    }
  }, [todos])

  const addTodo = (todo: Todo) => {
    setTodos(prev => {
      if (!Array.isArray(prev)) {
        // eslint-disable-next-line no-console
        console.warn('addTodo: prevTodos is not iterable', prev)
        return [todo]
      }
      return [...prev, todo]
    })
  }

  const removeTodo = (id: number | string) => {
    const shouldRemove = window.confirm('Are you sure?')
    if (shouldRemove) {
      setTodos(prev => {
        if (!Array.isArray(prev)) {
          // eslint-disable-next-line no-console
          console.warn('removeTodo: prevTodos is not iterable', prev)
          return []
        }
        return prev.filter(ele => (ele.id ?? ele.createdAt) !== id)
      })
    }
  }

  const toggleTodo = (id: number | string) => {
    setTodos(prev => {
      if (!Array.isArray(prev)) {
        // eslint-disable-next-line no-console
        console.warn('toggleTodo: prevTodos is not iterable', prev)
        return []
      }
      return prev.map(t => ((t.id ?? t.createdAt) === id ? { ...t, isCompleted: !t.isCompleted } : t))
    })
  }

  const toggleArchive = (id: number | string) => {
    setTodos(prev => {
      if (!Array.isArray(prev)) {
        // eslint-disable-next-line no-console
        console.warn('toggleArchive: prevTodos is not iterable', prev)
        return []
      }
      return prev.map(t => ((t.id ?? t.createdAt) === id ? { ...t, isArchive: !t.isArchive } : t))
    })
  }

  // Search state: text query and date range (yyyy-mm-dd)
  const [query, setQuery] = useState<string>('')
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const clearFilters = () => {
    setQuery('')
    setFromDate('')
    setToDate('')
    setSortOrder('asc')
  }


  const lowerQuery = query.trim().toLowerCase()

  const filtered = useMemo<Todo[]>(() => {
    const fromMs = fromDate ? new Date(fromDate).setHours(0,0,0,0) : -Infinity
    const toMs = toDate ? new Date(toDate).setHours(23,59,59,999) : Infinity
    return todos.filter((t: Todo) => {
      if (t.createdAt < fromMs || t.createdAt > toMs) return false
      if (lowerQuery && !t.title.toLowerCase().includes(lowerQuery)) return false
      return true
    })
  }, [todos, fromDate, toDate, lowerQuery])

  const sorted = useMemo<Todo[]>(() => {
    const arr = [...filtered]
    arr.sort((a, b) => (sortOrder === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt))
    return arr
  }, [filtered, sortOrder])

  const visibleTodos = sorted.filter((t: Todo) => !t.isArchive)
  const visibleArchived = sorted.filter((t: Todo) => t.isArchive)

  return (
    <div className="App">
      <AddTodo addTodo={ addTodo } />

      <div style={{ margin: '16px 0' }}>
        <label style={{ marginRight: 8 }}>
          Search:
          <input
            type="text"
            value={query}
            placeholder="search title..."
            onChange={(e) => setQuery(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </label>

        <label style={{ marginLeft: 16, marginRight: 8 }}>
          From:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </label>

        <label style={{ marginLeft: 8, marginRight: 8 }}>
          To:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </label>

        <label style={{ marginLeft: 12 }}>
          Sort:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')} style={{ marginLeft: 8 }}>
            <option value="asc">Create date ↑</option>
            <option value="desc">Create date ↓</option>
          </select>
        </label>

        <button onClick={clearFilters} style={{ marginLeft: 12 }}>Clear</button>
      </div>

      <TodosList todos = { visibleTodos } removeTodo={removeTodo} toggleTodo={toggleTodo} toggleArchive={toggleArchive} />
      {/* Archived items */}
      <ArchiveList archivedTodos={visibleArchived} unarchiveTodo={toggleArchive} />
    </div>
  )
}
