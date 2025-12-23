import React, { useState } from 'react'
import { colors, spacing, borderRadius, gradients } from '../styles'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: 'default' | 'danger' | 'primary' | 'success' | 'gradient'
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
    padding: `${spacing.md}px ${spacing.xl}px`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    borderRadius: borderRadius.md,
    fontSize: 14,
    fontWeight: 600,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 12px ${colors.shadow}`,
    opacity: disabled ? 0.5 : 1,
    transform: isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      background: colors.white,
      color: colors.text,
      border: `2px solid ${colors.border}`,
      boxShadow: isHovered && !disabled ? `0 6px 16px ${colors.shadowMedium}` : `0 2px 8px ${colors.shadow}`,
    },
    danger: {
      background: gradients.danger,
      color: colors.white,
      boxShadow: isHovered && !disabled ? `0 8px 20px ${colors.danger}40` : `0 4px 12px ${colors.danger}30`,
    },
    primary: {
      background: gradients.primary,
      color: colors.white,
      boxShadow: isHovered && !disabled ? `0 8px 20px ${colors.primary}40` : `0 4px 12px ${colors.primary}30`,
    },
    success: {
      background: gradients.success,
      color: colors.white,
      boxShadow: isHovered && !disabled ? `0 8px 20px ${colors.success}40` : `0 4px 12px ${colors.success}30`,
    },
    gradient: {
      background: gradients.primary,
      color: colors.white,
      boxShadow: isHovered && !disabled ? `0 8px 20px ${colors.primary}40` : `0 4px 12px ${colors.primary}30`,
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