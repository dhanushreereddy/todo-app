import React from 'react'
import MUIButton from '@mui/material/Button'
import { gradients } from '../styles'

interface ButtonProps {
  onClick?: () => void
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
  // Map our variant to MUI variant/color
  const muiVariant = variant === 'default' ? 'outlined' : 'contained'
  const color: any = variant === 'danger' ? 'error' : variant === 'success' ? 'success' : variant === 'primary' ? 'primary' : undefined

  const sx: any = {
    textTransform: 'none',
    fontWeight: 700,
    padding: '8px 20px',
    borderRadius: 2,
    boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
    ...(variant === 'gradient' && { backgroundImage: gradients.primary }),
    ...style
  }

  return (
    <MUIButton variant={muiVariant as any} color={color} onClick={onClick} disabled={disabled} sx={sx}>
      {children}
    </MUIButton>
  )
}