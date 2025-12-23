import React, { useState } from 'react'
import { Todo, Category } from '../types'
import { Button } from './Button'
import { Input } from './Input'
import { spacing, borderRadius, colors } from '../styles'

interface AddTodoProps {
  addTodo: (todo: Todo) => void
  categories: Category[]
  onAddCategory: (category: Category) => void
}

export function AddTodo({ addTodo, categories, onAddCategory }: AddTodoProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [type, setType] = useState<'text' | 'image' | 'location'>('text')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [showCategoryInput, setShowCategoryInput] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [locationData, setLocationData] = useState({ lat: '', lng: '', address: '' })

  const handleSubmit = () => {
    if (!title.trim()) return
    
    const todo: Todo = {
      id: Date.now(),
      createdAt: Date.now(),
      title: title.trim(),
      isCompleted: false,
      isArchive: false,
      type,
      content: type === 'text' ? content : '',
      category: selectedCategory || undefined,
    }

    if (type === 'image' && imageUrl) {
      todo.imageUrl = imageUrl
    }

    if (type === 'location' && locationData.lat && locationData.lng) {
      todo.location = {
        lat: parseFloat(locationData.lat),
        lng: parseFloat(locationData.lng),
        address: locationData.address || undefined
      }
    }

    addTodo(todo)
    setTitle('')
    setContent('')
    setImageUrl('')
    setLocationData({ lat: '', lng: '', address: '' })
  }

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return
    
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    
    const category: Category = {
      id: `cat_${Date.now()}`,
      name: newCategoryName.trim(),
      color: randomColor
    }
    
    onAddCategory(category)
    setSelectedCategory(category.id)
    setNewCategoryName('')
    setShowCategoryInput(false)
  }

  return (
    <div style={{ 
      marginBottom: spacing.xl,
      padding: spacing.lg,
      background: colors.white,
      borderRadius: borderRadius.lg,
      boxShadow: `0 2px 8px ${colors.shadow}`,
      border: `1px solid ${colors.border}`
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        <Input
          value={title}
          onChange={setTitle}
          placeholder="Note title..."
          style={{ fontSize: 16, fontWeight: 500 }}
        />

        <div style={{ display: 'flex', gap: spacing.sm }}>
          <Button 
            onClick={() => setType('text')} 
            variant={type === 'text' ? 'primary' : 'default'}
            style={{ padding: `${spacing.sm}px ${spacing.md}px` }}
          >
             Text
          </Button>
          <Button 
            onClick={() => setType('image')} 
            variant={type === 'image' ? 'primary' : 'default'}
            style={{ padding: `${spacing.sm}px ${spacing.md}px` }}
          >
             Image
          </Button>
          <Button 
            onClick={() => setType('location')} 
            variant={type === 'location' ? 'primary' : 'default'}
            style={{ padding: `${spacing.sm}px ${spacing.md}px` }}
          >
             Location
          </Button>
        </div>

        {type === 'text' && (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note content..."
            rows={3}
            style={{
              padding: spacing.md,
              border: `1px solid ${colors.border}`,
              borderRadius: borderRadius.sm,
              fontSize: 14,
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        )}

        {type === 'image' && (
          <Input
            value={imageUrl}
            onChange={setImageUrl}
            placeholder="Image URL..."
          />
        )}

        {type === 'location' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
            <Input
              value={locationData.lat}
              onChange={(val) => setLocationData(prev => ({ ...prev, lat: val }))}
              placeholder="Latitude (e.g., 40.7128)"
              type="number"
            />
            <Input
              value={locationData.lng}
              onChange={(val) => setLocationData(prev => ({ ...prev, lng: val }))}
              placeholder="Longitude (e.g., -74.0060)"
              type="number"
            />
            <Input
              value={locationData.address}
              onChange={(val) => setLocationData(prev => ({ ...prev, address: val }))}
              placeholder="Address (optional)"
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: spacing.sm, alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: `${spacing.sm}px ${spacing.md}px`,
              border: `1px solid ${colors.border}`,
              borderRadius: borderRadius.sm,
              fontSize: 14,
              background: colors.white,
              cursor: 'pointer',
              minWidth: 150
            }}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {!showCategoryInput && (
            <Button 
              onClick={() => setShowCategoryInput(true)}
              style={{ padding: `${spacing.sm}px ${spacing.md}px` }}
            >
               Add New Category
            </Button>
          )}

          {showCategoryInput && (
            <>
              <Input
                value={newCategoryName}
                onChange={setNewCategoryName}
                placeholder="Category name..."
                style={{ minWidth: 150 }}
              />
              <Button onClick={handleAddCategory} variant="primary">
                Add
              </Button>
              <Button onClick={() => setShowCategoryInput(false)}>
                Cancel
              </Button>
            </>
          )}
        </div>

        <Button onClick={handleSubmit} variant="primary" style={{ padding: `${spacing.md}px ${spacing.xl}px` }}>
          Add Note
        </Button>
      </div>
    </div>
  )
}