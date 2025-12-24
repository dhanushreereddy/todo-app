import React from 'react'
import { ArchiveList } from './ArchiveList'
import { ArchivedTodoItem } from './ArchivedTodoItem'

const categories = [
  { id: '1', name: 'Work', color: '#6366f1' },
  { id: '2', name: 'Personal', color: '#10b981' }
]

const todos = new Array(2).fill(null).map((_, i) => ({
  id: `arch-${i+1}`,
  createdAt: Date.now(),
  title: `Archived todo #${i + 1}`,
  isCompleted: i % 2 === 0,
  isArchive: true,
  category: '2',
  type: 'text' as any,
  content: 'This todo is archived',
})) as any

const meta = {
  title: 'Components/Archive/ArchiveList',
  component: ArchiveList,
  argTypes: {
    unarchiveTodo: { action: 'unarchived' }
  }
}

export default meta

export const Default = { args: { archivedTodos: todos, unarchiveTodo: () => {}, categories } }

// Single item story
export const Item = () => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    <ArchivedTodoItem todo={todos[0]} onUnarchive={() => {}} categories={categories} />
  </ul>
)