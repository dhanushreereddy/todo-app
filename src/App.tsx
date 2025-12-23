import { useState } from 'react'
import { FilterState, Todo, Category } from './types'
import { AddTodo } from './components/AddTodo'
import { FilterControls } from './components/FilteredControl'
import { TodosList } from './components/TodoList'
import { ArchiveList } from './components/ArchiveList'
import { Pagination } from './components/Pagination'
import { usePersistentData } from './hooks/usePersistentTodos'
import { useFilteredTodos } from './hooks/useFilteredTodos'
import { usePagination } from './hooks/usePagination'
import { colors, spacing } from './styles'

export default function App() {
  const { todos, setTodos, categories, setCategories, loading } = usePersistentData()
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    fromDate: '',
    toDate: '',
    sortOrder: 'desc',
    category: '',
    type: 'all'
  })

  const filteredTodos = useFilteredTodos(todos, filters)
  const visibleTodos = filteredTodos.filter(t => !t.isArchive)
  const visibleArchived = filteredTodos.filter(t => t.isArchive)
  
  const {
    currentPage: activePage,
    totalPages: activeTotalPages,
    paginatedItems: paginatedActive,
    goToPage: goToActivePage,
    totalItems: activeTotalItems
  } = usePagination(visibleTodos, 10)
  
  const {
    currentPage: archivedPage,
    totalPages: archivedTotalPages,
    paginatedItems: paginatedArchived,
    goToPage: goToArchivedPage,
    totalItems: archivedTotalItems
  } = usePagination(visibleArchived, 10)

  const addTodo = (todo: Todo) => {
    setTodos(prev => [...prev, todo])
  }

  const removeTodo = (id: string | number) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const toggleTodo = (id: number | string) => {
    setTodos(prev => prev.map(t => 
      ((t.id ?? t.createdAt) === id ? { ...t, isCompleted: !t.isCompleted } : t)
    ))
  }

  const toggleArchive = (id: number | string) => {
    setTodos(prev => prev.map(t => 
      ((t.id ?? t.createdAt) === id ? { ...t, isArchive: !t.isArchive } : t)
    ))
  }

  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category])
  }

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({
      query: '',
      fromDate: '',
      toDate: '',
      sortOrder: 'desc',
      category: '',
      type: 'all'
    })
  }

  if (loading) {
    return (
      <div style={{ 
        padding: spacing.xl,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: colors.background
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: spacing.md }}>⏳</div>
          <p style={{ color: colors.textMuted, fontSize: 16 }}>Loading your notes...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.background} 100%)`,
      padding: spacing.xl
    }}>
      <div style={{ 
        maxWidth: 900,
        margin: '0 auto'
      }}>
        <header style={{ marginBottom: spacing.xxl, textAlign: 'center' }}>
          <h1 style={{ 
            color: colors.text,
            fontSize: 42,
            fontWeight: 700,
            margin: 0,
            marginBottom: spacing.sm
          }}>
             Notes App
          </h1>
          <p style={{ 
            color: colors.textMuted,
            fontSize: 16,
            margin: 0
          }}>
            Organize your thoughts with text, images, and locations
          </p>
        </header>

        <AddTodo addTodo={addTodo} categories={categories} onAddCategory={addCategory} />
        <FilterControls 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onClearFilters={clearFilters}
          categories={categories}
        />
        <TodosList 
          todos={paginatedActive} 
          removeTodo={removeTodo} 
          toggleTodo={toggleTodo} 
          toggleArchive={toggleArchive}
          categories={categories}
        />
        <Pagination
          currentPage={activePage}
          totalPages={activeTotalPages}
          onPageChange={goToActivePage}
          itemsPerPage={10}
          totalItems={activeTotalItems}
        />
        <ArchiveList 
          archivedTodos={paginatedArchived} 
          unarchiveTodo={toggleArchive}
          categories={categories}
        />
        {archivedTotalPages > 1 && (
          <Pagination
            currentPage={archivedPage}
            totalPages={archivedTotalPages}
            onPageChange={goToArchivedPage}
            itemsPerPage={10}
            totalItems={archivedTotalItems}
          />
        )}
      </div>
    </div>
  )
}