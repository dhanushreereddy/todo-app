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
        padding: `${spacing.md}px ${spacing.lg}px`,
        border: `2px solid ${colors.border}`,
        borderRadius: borderRadius.md,
        fontSize: 15,
        outline: 'none',
        transition: 'all 0.3s ease',
        background: colors.white,
        color: colors.text,
        fontWeight: 500,
        ...style
      }}
      onFocus={(e) => {
        e.target.style.borderColor = colors.primary
        e.target.style.boxShadow = `0 0 0 4px ${colors.primary}15`
        e.target.style.transform = 'translateY(-1px)'
      }}
      onBlur={(e) => {
        e.target.style.borderColor = colors.border
        e.target.style.boxShadow = 'none'
        e.target.style.transform = 'translateY(0)'
      }}
    />
  )
}
