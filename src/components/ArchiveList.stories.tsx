import { Meta, StoryObj } from '@storybook/react'
import type { Todo, Category } from '../types'
import { ArchiveList } from './ArchiveList' 

const categories: Category[] = [
  { id: '1', name: 'Work', color: '#6366f1' },
  { id: '2', name: 'Personal', color: '#10b981' }
]

const todos: Todo[] = [
  { id: 'arch-1', createdAt: Date.now(), title: 'Archived todo #1', isCompleted: false, isArchive: true, category: '2', type: 'text', content: 'This todo is archived' },
  { id: 'arch-2', createdAt: Date.now(), title: 'Archived todo #2', isCompleted: true, isArchive: true, category: '2', type: 'text', content: 'This todo is archived' },
]

const meta: Meta<typeof ArchiveList> = {
  title: 'Components/ArchiveList',
  component: ArchiveList,
  argTypes: {
    unarchiveTodo: { action: 'unarchived' }
  }
}

export default meta

type Story = StoryObj<typeof ArchiveList>

export const Default: Story = { args: { archivedTodos: todos, unarchiveTodo: () => {}, categories } }
export const Empty: Story = { args: { archivedTodos: [], unarchiveTodo: () => {}, categories } }
