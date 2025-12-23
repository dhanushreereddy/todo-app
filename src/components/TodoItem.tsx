import React, { useState } from 'react'
import { Todo, Category } from '../types'
import { Button } from './Button'
import { colors, spacing, borderRadius, gradients } from '../styles'

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

  const getTypeIcon = () => {
    switch(todo.type) {
      case 'text': return '📝'
      case 'image': return '🖼️'
      case 'location': return '📍'
    }
  }

  const getTypeGradient = () => {
    switch(todo.type) {
      case 'text': return gradients.info
      case 'image': return gradients.purple
      case 'location': return gradients.ocean
      default: return gradients.info
    }
  }

  return (
    <div 
      style={{ 
        padding: spacing.xl,
        border: `2px solid ${colors.border}`,
        borderRadius: borderRadius.lg,
        background: colors.white,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered ? `0 12px 28px ${colors.shadowMedium}` : `0 4px 12px ${colors.shadow}`,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 280,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top gradient bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: getTypeGradient(),
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.md }}>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={onToggle}
          style={{ 
            width: 22, 
            height: 22, 
            cursor: 'pointer',
            accentColor: colors.primary,
            marginTop: 2,
            flexShrink: 0
          }}
        />
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.xs, flexWrap: 'wrap' }}>
            <h3 style={{ 
              margin: 0,
              textDecoration: todo.isCompleted ? 'line-through' : 'none',
              color: todo.isCompleted ? colors.textMuted : colors.text,
              fontSize: 18,
              fontWeight: 700,
              wordBreak: 'break-word',
            }}>
              {todo.title}
            </h3>
          </div>
          
          <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap', marginTop: spacing.sm }}>
            <span style={{
              padding: `${spacing.xs}px ${spacing.md}px`,
              background: getTypeGradient(),
              color: colors.white,
              borderRadius: borderRadius.sm,
              fontSize: 12,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: spacing.xs,
            }}>
              {getTypeIcon()} {todo.type.toUpperCase()}
            </span>
            
            {category && (
              <span style={{
                padding: `${spacing.xs}px ${spacing.md}px`,
                background: category.color,
                color: colors.white,
                borderRadius: borderRadius.sm,
                fontSize: 12,
                fontWeight: 700,
              }}>
                {category.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, marginBottom: spacing.lg }}>
        {todo.type === 'text' && todo.content && (
          <p style={{ 
            margin: 0,
            color: colors.textMuted, 
            fontSize: 15,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {todo.content}
          </p>
        )}
        
        {todo.type === 'image' && todo.imageUrl && (
          <div style={{ marginTop: spacing.sm }}>
            <img 
              src={todo.imageUrl} 
              alt={todo.title}
              style={{ 
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: borderRadius.md,
                border: `2px solid ${colors.border}`
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const errorDiv = document.createElement('div')
                errorDiv.style.cssText = `padding: ${spacing.lg}px; background: ${colors.backgroundDark}; color: ${colors.danger}; border-radius: ${borderRadius.md}px; font-size: 14px; font-weight: 600; text-align: center;`
                errorDiv.textContent = '❌ Failed to load image'
                e.currentTarget.parentElement?.appendChild(errorDiv)
              }}
            />
          </div>
        )}
        
        {todo.type === 'location' && todo.location && (
          <div style={{ 
            padding: spacing.lg,
            background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundDark} 100%)`,
            borderRadius: borderRadius.md,
            marginTop: spacing.sm,
            border: `2px solid ${colors.border}`
          }}>
            <div style={{ fontSize: 14, color: colors.text, fontWeight: 700, marginBottom: spacing.sm, display: 'flex', alignItems: 'center', gap: spacing.sm }}>
              <span style={{ fontSize: 20 }}>📍</span>
              Location Details
            </div>
            <div style={{ fontSize: 14, color: colors.textMuted, lineHeight: 1.6 }}>
              {todo.location.address ? (
                <>
                  <div style={{ fontWeight: 600, color: colors.text }}>{todo.location.address}</div>
                  <div style={{ fontSize: 12, marginTop: spacing.xs, color: colors.textLight }}>
                    {todo.location.lat.toFixed(6)}, {todo.location.lng.toFixed(6)}
                  </div>
                </>
              ) : (
                <div style={{ fontWeight: 600 }}>
                  {todo.location.lat.toFixed(6)}, {todo.location.lng.toFixed(6)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingTop: spacing.md,
        borderTop: `2px solid ${colors.border}`,
        gap: spacing.md,
        flexWrap: 'wrap'
      }}>
        <small style={{ 
          color: colors.textLight,
          fontSize: 12,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.xs
        }}>
          🕐 {new Date(todo.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </small>
        <div style={{ display: 'flex', gap: spacing.sm }}>
          <Button onClick={onArchive} style={{ padding: `${spacing.sm}px ${spacing.md}px`, fontSize: 12 }}>
            archive
          </Button>
          <Button onClick={onDelete} variant="danger" style={{ padding: `${spacing.sm}px ${spacing.md}px`, fontSize: 12 }}>
            delete
          </Button>
        </div>
      </div>
    </div>
  )
}