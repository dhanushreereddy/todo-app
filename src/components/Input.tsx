import React from 'react'
import { colors, spacing, borderRadius } from '../styles'

interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  style?: React.CSSProperties
  onKeyPress?: (e: React.KeyboardEvent) => void
}

export function Input({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  style,
  onKeyPress
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      style={{
        padding: `${spacing.sm}px ${spacing.md}px`,
        border: `1px solid ${colors.border}`,
        borderRadius: borderRadius.sm,
        fontSize: 14,
        outline: 'none',
        transition: 'all 0.2s',
        ...style
      }}
      onFocus={(e) => {
        e.target.style.borderColor = colors.primary
        e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
      }}
      onBlur={(e) => {
        e.target.style.borderColor = colors.border
        e.target.style.boxShadow = 'none'
      }}
    />
  )
}