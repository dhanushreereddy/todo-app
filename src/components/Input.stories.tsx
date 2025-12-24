import { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input' 

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    onChange: { action: 'changed' }
  }
}

export default meta

type Story = StoryObj<typeof Input>

export const Empty: Story = { args: { value: '', placeholder: 'Enter text' } }
export const WithValue: Story = { args: { value: 'Hello world' } }
