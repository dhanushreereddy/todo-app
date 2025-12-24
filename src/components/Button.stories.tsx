import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button' 

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = { args: { children: 'Default' } }
export const Primary: Story = { args: { children: 'Primary', variant: 'primary' } }
export const Danger: Story = { args: { children: 'Delete', variant: 'danger' } }
export const Disabled: Story = { args: { children: 'Disabled', disabled: true } }
