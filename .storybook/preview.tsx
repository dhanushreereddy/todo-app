import React from 'react'
import { Preview } from '@storybook/react'
import { colors, spacing } from '../src/styles'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const containerStyle = {
  minHeight: '100vh',
  padding: spacing.xl,
  background: colors.background,
}

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary
    }
  }
})

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: { expanded: true }
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={containerStyle}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ]
}

export default preview
