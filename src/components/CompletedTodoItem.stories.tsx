import React from 'react'
import { CompletedList } from './CompletedList'
import { CompletedTodoItem } from './CompletedTodoItem'

const categories = [
  { id: '1', name: 'Work', color: '#6366f1' },
  { id: '2', name: 'Personal', color: '#10b981' }
]

const todos = new Array(3).fill(null).map((_, i) => ({
  id: `c-${i+1}`,
  createdAt: Date.now(),
  title: `Completed todo #${i + 1}`,
  isCompleted: true,
  isArchive: false,
  category: '1',
  type: 'text' as any,
  content: 'This todo is completed',
})) as any

const meta = {
  title: 'Components/Completed/CompletedList',
  component: CompletedList,
  argTypes: {
    onUncomplete: { action: 'uncompleted' },
    onDelete: { action: 'deleted' }
  }
}

export default meta

export const Default = { args: { completedTodos: todos, onUncomplete: () => {}, onDelete: () => {}, categories } }

// Single item story
export const Item = () => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    <CompletedTodoItem todo={todos[0]} onUncomplete={() => {}} onDelete={() => {}} categories={categories} />
  </ul>
)