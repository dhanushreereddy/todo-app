import React, { useState } from 'react'
import { Todo, Category } from '../types'
import { Button } from './Button'
import { colors, spacing, borderRadius } from '../styles'

interface CompletedTodoItemProps {
  todo: Todo
  onUncomplete: () => void
  onDelete?: () => void
  categories: Category[]
}

export function CompletedTodoItem({ 
  todo, 
  onUncomplete,
  onDelete,
  categories
}: CompletedTodoItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const category = categories.find(c => c.id === todo.category)

  return (
    <li 
      style={{ 
        marginBottom: spacing.sm, 
        padding: spacing.sm, 
        border: `1px solid ${colors.border}`,
        borderRadius: borderRadius.md,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
        opacity: isHovered ? 1 : 0.95,
        background: colors.white,
        boxShadow: isHovered ? `0 6px 14px ${colors.shadowMedium}` : `0 1px 4px ${colors.shadow}`,
        transition: 'all 0.18s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span style={{ 
            textDecoration: 'line-through',
            color: colors.textMuted,
            fontSize: 14,
            lineHeight: 1.2
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
              opacity: 0.8
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
      <div style={{ display: 'flex', gap: spacing.sm }}>
        <Button onClick={onUncomplete} style={{ padding: `${spacing.xs}px ${spacing.md}px`, fontSize: 13 }}>
          ↩️ Mark active
        </Button>
        {onDelete && (
          <Button onClick={onDelete} variant="danger" style={{ padding: `${spacing.xs}px ${spacing.md}px`, fontSize: 13 }}>
            delete
          </Button>
        )}
      </div>
    </li>
  )
}
