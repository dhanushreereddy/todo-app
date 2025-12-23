import { useMemo } from 'react'
import { Todo, FilterState } from '../types'

export function useFilteredTodos(todos: Todo[], filters: FilterState) {
  const lowerQuery = filters.query.trim().toLowerCase()

  const filtered = useMemo<Todo[]>(() => {
    const fromMs = filters.fromDate ? new Date(filters.fromDate).setHours(0, 0, 0, 0) : -Infinity
    const toMs = filters.toDate ? new Date(filters.toDate).setHours(23, 59, 59, 999) : Infinity
    
    return todos.filter((t: Todo) => {
      if (t.createdAt < fromMs || t.createdAt > toMs) return false
      if (lowerQuery && !t.title.toLowerCase().includes(lowerQuery)) return false
      if (filters.category && filters.category !== 'none' && t.category !== filters.category) return false
      if (filters.category === 'none' && t.category) return false
      if (filters.type !== 'all' && t.type !== filters.type) return false
      return true
    })
  }, [todos, filters.fromDate, filters.toDate, lowerQuery, filters.category, filters.type])

  const sorted = useMemo<Todo[]>(() => {
    const arr = [...filtered]
    arr.sort((a, b) => 
      filters.sortOrder === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
    )
    return arr
  }, [filtered, filters.sortOrder])

  return sorted
}
