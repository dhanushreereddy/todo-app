import React from 'react'
import TextField from '@mui/material/TextField'

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
    <TextField
      size="small"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      sx={{ ...style }}
    />
  )
}