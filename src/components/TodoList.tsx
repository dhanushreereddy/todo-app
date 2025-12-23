import React from 'react'
import { Todo, Category } from '../types'
import { TodoItem } from './TodoItem'
import { spacing, colors, borderRadius } from '../styles'

interface TodosListProps {
  todos: Todo[]
  removeTodo: (id: string | number) => void
  toggleTodo: (id: string | number) => void
  toggleArchive: (id: string | number) => void
  categories: Category[]
}

export function TodosList({ 
  todos, 
  removeTodo, 
  toggleTodo, 
  toggleArchive,
  categories
}: TodosListProps) {
  if (todos.length === 0) {
    return (
      <div style={{ 
        padding: spacing.xxl,
        textAlign: 'center',
        color: colors.textMuted,
        background: colors.background,
        borderRadius: borderRadius.lg,
        border: `2px dashed ${colors.border}`
      }}>
        <div style={{ fontSize: 48, marginBottom: spacing.md }}>📝</div>
        <p style={{ margin: 0, fontSize: 16 }}>No notes yet. Add one above to get started!</p>
      </div>
    )
  }

  return (
    <div>
      <h3 style={{ 
        color: colors.text, 
        marginBottom: spacing.lg,
        fontSize: 18,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm
      }}>
         Active Notes
        <span style={{ 
          background: colors.primary,
          color: colors.white,
          padding: `${spacing.xs}px ${spacing.md}px`,
          borderRadius: borderRadius.sm,
          fontSize: 14,
          fontWeight: 500
        }}>
          {todos.length}
        </span>
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onArchive={() => toggleArchive(todo.id)}
            onDelete={() => removeTodo(todo.id)}
            categories={categories}
          />
        ))}
      </ul>
    </div>
  )
}