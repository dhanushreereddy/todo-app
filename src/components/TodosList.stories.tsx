import { Meta, StoryObj } from '@storybook/react'
import { TodosList } from './TodoList'
import type { Todo, Category } from '../types' 

const categories: Category[] = [
  { id: '1', name: 'Work', color: '#6366f1' },
  { id: '2', name: 'Personal', color: '#10b981' }
]

const todos: Todo[] = [
  { id: 1, createdAt: Date.now(), title: 'Sample todo #1', isCompleted: true, isArchive: false, category: '1', type: 'text', content: 'This is an example todo used in Storybook' },
  { id: 2, createdAt: Date.now(), title: 'Sample todo #2', isCompleted: false, isArchive: false, category: '1', type: 'text', content: 'This is an example todo used in Storybook' },
  { id: 3, createdAt: Date.now(), title: 'Sample todo #3', isCompleted: true, isArchive: false, category: '1', type: 'text', content: 'This is an example todo used in Storybook' },
]

const meta: Meta<typeof TodosList> = {
  title: 'Components/TodosList',
  component: TodosList,
  argTypes: {
    removeTodo: { action: 'removed' },
    toggleTodo: { action: 'toggled' },
    toggleArchive: { action: 'archived' }
  }
}

export default meta

type Story = StoryObj<typeof TodosList>

export const Default: Story = { args: { todos, removeTodo: () => {}, toggleTodo: () => {}, toggleArchive: () => {}, categories } }
export const Empty: Story = { args: { todos: [], removeTodo: () => {}, toggleTodo: () => {}, toggleArchive: () => {}, categories } }
