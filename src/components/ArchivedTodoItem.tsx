import React, { useState } from 'react'
import { Todo, Category } from '../types'
import { Button } from './Button'
import { colors, spacing, borderRadius } from '../styles'

interface ArchivedTodoItemProps {
  todo: Todo
  onUnarchive: () => void
  categories: Category[]
}

export function ArchivedTodoItem({ 
  todo, 
  onUnarchive,
  categories
}: ArchivedTodoItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const category = categories.find(c => c.id === todo.category)

  return (
    <li 
      style={{ 
        marginBottom: spacing.sm, 
        padding: spacing.md, 
        border: `1px solid ${colors.border}`,
        borderRadius: borderRadius.md,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
        opacity: isHovered ? 0.9 : 0.6,
        background: colors.background,
        transition: 'all 0.2s',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span style={{ 
            textDecoration: todo.isCompleted ? 'line-through' : 'none',
            color: colors.textMuted,
            fontSize: 15,
          }}>
            {todo.title}
          </span>
          {category && (
            <span style={{
              padding: `${spacing.xs}px ${spacing.sm}px`,
              background: category.color,
              color: colors.white,
              borderRadius: borderRadius.sm,
              fontSize: 11,
              fontWeight: 600,
              opacity: 0.7
            }}>
              {category.name}
            </span>
          )}
        </div>
      </div>
      <small style={{ 
        color: colors.textLight,
        fontSize: 12,
        minWidth: 80,
        textAlign: 'right'
      }}>
        {new Date(todo.createdAt).toLocaleDateString()}
      </small>
      <Button onClick={onUnarchive} style={{ padding: `${spacing.xs}px ${spacing.md}px`, fontSize: 13 }}>
        ↩️ Restore
      </Button>
    </li>
  )
}