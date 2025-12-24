import React from 'react'
import MUIButton from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

const meta = {
  title: 'Design System/MUI Playground'
}

export default meta

export const Default = () => (
  <Stack spacing={2} sx={{ width: 400 }}>
    <div style={{ display: 'flex', gap: 12 }}>
      <MUIButton variant="contained" color="primary">MUI Primary</MUIButton>
      <MUIButton variant="outlined">MUI Outlined</MUIButton>
    </div>

    <div style={{ display: 'flex', gap: 12 }}>
      <Button onClick={() => {}}>App Button</Button>
      <Button onClick={() => {}} variant="gradient">Gradient</Button>
      <Button onClick={() => {}} variant="danger">Danger</Button>
    </div>

    <TextField label="MUI Input" variant="outlined" />
    <Input value="Hello from App Input" onChange={() => {}} />
  </Stack>
)