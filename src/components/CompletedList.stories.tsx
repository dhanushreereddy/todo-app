import { Meta, StoryObj } from '@storybook/react'
import type { Todo, Category } from '../types'
import { CompletedList } from './CompletedList' 

const categories: Category[] = [
  { id: '1', name: 'Work', color: '#6366f1' },
  { id: '2', name: 'Personal', color: '#10b981' }
]

const todos: Todo[] = [
  { id: 'c-1', createdAt: Date.now(), title: 'Completed todo #1', isCompleted: true, isArchive: false, category: '1', type: 'text', content: 'This todo is completed' },
  { id: 'c-2', createdAt: Date.now(), title: 'Completed todo #2', isCompleted: true, isArchive: false, category: '1', type: 'text', content: 'This todo is completed' },
  { id: 'c-3', createdAt: Date.now(), title: 'Completed todo #3', isCompleted: true, isArchive: false, category: '1', type: 'text', content: 'This todo is completed' },
]

const meta: Meta<typeof CompletedList> = {
  title: 'Components/CompletedList',
  component: CompletedList,
  argTypes: {
    onUncomplete: { action: 'uncompleted' },
    onDelete: { action: 'deleted' }
  }
}

export default meta

type Story = StoryObj<typeof CompletedList>

export const Default: Story = { args: { completedTodos: todos, onUncomplete: () => {}, onDelete: () => {}, categories } }
export const Empty: Story = { args: { completedTodos: [], onUncomplete: () => {}, onDelete: () => {}, categories } }
