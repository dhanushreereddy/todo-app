import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { TodoItem } from './TodoItem'
import type { Todo, Category } from '../types'

const categories: Category[] = [
  { id: '1', name: 'Work', color: '#6366f1' },
  { id: '2', name: 'Personal', color: '#10b981' }
]

const sampleTodo: Todo = {
  id: 'a1',
  createdAt: Date.now(),
  title: 'Finish Storybook setup',
  isCompleted: false,
  isArchive: false,
  category: '1',
  type: 'text',
  content: 'Add stories for core components and ensure Storybook runs',
}

const meta: Meta<typeof TodoItem> = {
  title: 'Components/TodoItem',
  component: TodoItem,
  argTypes: {
    onToggle: { action: 'toggled' },
    onArchive: { action: 'archived' },
    onDelete: { action: 'deleted' }
  }
}

export default meta

type Story = StoryObj<typeof TodoItem>

export const Default: Story = { args: { todo: sampleTodo, categories } }
export const Completed: Story = { args: { todo: { ...sampleTodo, isCompleted: true, title: 'Completed task' }, categories } }
export const ImageType: Story = { args: { todo: { ...sampleTodo, type: 'image' as any, imageUrl: 'https://via.placeholder.com/400x200', title: 'Image todo' }, categories } }
export const LocationType: Story = { args: { todo: { ...sampleTodo, type: 'location' as any, location: { lat: 37.7749, lng: -122.4194, address: 'San Francisco, CA' }, title: 'Location todo' }, categories } }
