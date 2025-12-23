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
        padding: spacing.xxl * 2,
        textAlign: 'center',
        color: colors.textMuted,
        background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundDark} 100%)`,
        borderRadius: borderRadius.xl,
        border: `3px dashed ${colors.border}`,
        marginTop: spacing.xl
      }}>
        <div style={{ fontSize: 64, marginBottom: spacing.lg }}>📝</div>
        <h3 style={{ margin: 0, marginBottom: spacing.sm, fontSize: 20, fontWeight: 700, color: colors.text }}>
          No todos yet
        </h3>
        <p style={{ margin: 0, fontSize: 16, color: colors.textMuted }}>
          Create your first todo above to get started!
        </p>
      </div>
    )
  }

  return (
    <div>
      <h3 style={{ 
        color: colors.text, 
        marginBottom: spacing.xl,
        fontSize: 24,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.md
      }}>
        <span style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          ✨ Active Todos
        </span>
        <span style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: colors.white,
          padding: `${spacing.xs}px ${spacing.lg}px`,
          borderRadius: borderRadius.md,
          fontSize: 16,
          fontWeight: 700,
          boxShadow: `0 4px 12px ${colors.primary}30`
        }}>
          {todos.length}
        </span>
      </h3>
      
      {/* GRID LAYOUT */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: spacing.xl,
        marginBottom: spacing.xl
      }}>
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
      </div>
    </div>
  )
}