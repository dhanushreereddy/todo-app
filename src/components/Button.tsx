import React, { useState } from 'react'
import { colors, spacing, borderRadius } from '../styles'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: 'default' | 'danger' | 'primary'
  style?: React.CSSProperties
  disabled?: boolean
}

export function Button({ 
  onClick, 
  children, 
  variant = 'default',
  style,
  disabled = false
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const baseStyle: React.CSSProperties = {
    padding: `${spacing.sm}px ${spacing.lg}px`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    borderRadius: borderRadius.sm,
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.2s',
    boxShadow: `0 1px 2px ${colors.shadow}`,
    opacity: disabled ? 0.5 : 1,
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      background: colors.white,
      color: colors.text,
      border: `1px solid ${colors.border}`,
    },
    danger: {
      background: isHovered && !disabled ? colors.dangerHover : colors.danger,
      color: colors.white,
    },
    primary: {
      background: isHovered && !disabled ? colors.primaryHover : colors.primary,
      color: colors.white,
    },
  }

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...baseStyle, ...variantStyles[variant], ...style }}
    >
      {children}
    </button>
  )
}