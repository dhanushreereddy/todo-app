import React, { useState } from 'react'
import { Todo, Category } from '../types'
import { Button } from './Button'
import { colors, spacing, borderRadius } from '../styles'

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onArchive: () => void
  onDelete: () => void
  categories: Category[]
}

export function TodoItem({ 
  todo, 
  onToggle, 
  onArchive, 
  onDelete,
  categories
}: TodoItemProps) {
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
        flexDirection: 'column',
        gap: spacing.sm,
        background: isHovered ? colors.background : colors.white,
        transition: 'all 0.2s',
        boxShadow: isHovered ? `0 2px 8px ${colors.shadow}` : `0 1px 2px ${colors.shadow}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.sm }}>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={onToggle}
          style={{ 
            width: 18, 
            height: 18, 
            cursor: 'pointer',
            accentColor: colors.primary,
            marginTop: 2
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.xs }}>
            <span style={{ 
              textDecoration: todo.isCompleted ? 'line-through' : 'none',
              color: todo.isCompleted ? colors.textMuted : colors.text,
              fontSize: 15,
              fontWeight: 500,
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
              }}>
                {category.name}
              </span>
            )}
            <span style={{
              padding: `${spacing.xs}px ${spacing.sm}px`,
              background: colors.background,
              color: colors.textMuted,
              borderRadius: borderRadius.sm,
              fontSize: 11,
              fontWeight: 500,
            }}>
              {todo.type === 'text' && 'Text'}
              {todo.type === 'image' && 'Image'}
              {todo.type === 'location' && 'Location'}
            </span>
          </div>
          
          {todo.type === 'text' && (
            <p style={{ margin: 0, color: colors.textMuted, fontSize: 14 }}>
              {todo.content}
            </p>
          )}
          
          {todo.type === 'image' && todo.imageUrl && (
            <img 
              src={todo.imageUrl} 
              alt={todo.title}
              style={{ 
                maxWidth: '100%', 
                maxHeight: 200, 
                borderRadius: borderRadius.sm,
                marginTop: spacing.xs
              }}
            />
          )}
          
          {todo.type === 'location' && todo.location && (
            <div style={{ 
              padding: spacing.sm,
              background: colors.background,
              borderRadius: borderRadius.sm,
              marginTop: spacing.xs
            }}>
              <div style={{ fontSize: 13, color: colors.textMuted }}>
                 {todo.location.address || `${todo.location.lat}, ${todo.location.lng}`}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <small style={{ 
          color: colors.textLight,
          fontSize: 12,
        }}>
          {new Date(todo.createdAt).toLocaleDateString()} {new Date(todo.createdAt).toLocaleTimeString()}
        </small>
        <div style={{ display: 'flex', gap: spacing.xs }}>
          <Button onClick={onArchive} style={{ padding: `${spacing.xs}px ${spacing.md}px`, fontSize: 13 }}>
            Archive
          </Button>
          <Button onClick={onDelete} variant="danger" style={{ padding: `${spacing.xs}px ${spacing.md}px`, fontSize: 13 }}>
            Delete
          </Button>
        </div>
      </div>
    </li>
  )
}

