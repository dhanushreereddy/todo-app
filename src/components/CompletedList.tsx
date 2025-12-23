import React from 'react'
import { Todo, Category } from '../types'
import { CompletedTodoItem } from './CompletedTodoItem'
import { spacing, colors, borderRadius } from '../styles'

interface CompletedListProps {
  completedTodos: Todo[]
  onUncomplete: (id: string | number) => void
  onDelete: (id: string | number) => void
  categories: Category[]
}

export function CompletedList({ 
  completedTodos, 
  onUncomplete,
  onDelete,
  categories
}: CompletedListProps) {
  if (completedTodos.length === 0) return null

  return (
    <div style={{ 
      marginTop: spacing.xl, 
      paddingTop: spacing.lg, 
      borderTop: `1px solid ${colors.border}` 
    }}>
      <h3 style={{ 
        color: colors.textMuted,
        marginBottom: spacing.md,
        fontSize: 18,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm
      }}>
         Completed
        <span style={{ 
          background: colors.textMuted,
          color: colors.white,
          padding: `${spacing.xs}px ${spacing.md}px`,
          borderRadius: borderRadius.sm,
          fontSize: 14,
          fontWeight: 500
        }}>
          {completedTodos.length}
        </span>
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {completedTodos.map((todo) => (
          <CompletedTodoItem
            key={todo.id}
            todo={todo}
            onUncomplete={() => onUncomplete(todo.id)}
            onDelete={() => onDelete(todo.id)}
            categories={categories}
          />
        ))}
      </ul>
    </div>
  )
}
