import React, { useState } from 'react'
import { useExternalTodos, useDeleteExternalTodo } from '../hooks/useExternalTodos'
import { Todo, Category, TodoType, ExternalTodo } from '../types' 
import { Button } from './Button'
import { Input } from './Input'
import { spacing, borderRadius, colors, gradients } from '../styles'

interface AddTodoProps {
  addTodo: (todo: Todo) => void
  categories: Category[]
  onAddCategory: (category: Category) => void
}

export function AddTodo({ addTodo, categories, onAddCategory }: AddTodoProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [type, setType] = useState<TodoType>('text')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [showCategoryInput, setShowCategoryInput] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [locationData, setLocationData] = useState({ lat: '', lng: '', address: '' })
  
  //external todo
  const [selectedExternalId, setSelectedExternalId] = useState<number | ''>('')
  
  const { data: externalTodos, isLoading: isLoadingExternal, isError: isErrorExternal } = useExternalTodos()
  const deleteExternalMutation = useDeleteExternalTodo()




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
    
    const categoryColors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']
    const randomColor = categoryColors[Math.floor(Math.random() * categoryColors.length)]
    
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
    <div 
      style={{ 
        marginBottom: spacing.xxl,
        padding: spacing.xxl,
        background: colors.white,
        borderRadius: borderRadius.xl,
        boxShadow: `0 8px 24px ${colors.shadowMedium}`,
        border: `2px solid ${colors.border}`,
        position: 'relative',
        overflow: 'hidden'
      }
    }>
      {/* Decorative gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 6,
        background: gradients.primary,
      }} />

      <h2 
        style={{
          margin: 0,
          marginBottom: spacing.xl,
          fontSize: 24,
          fontWeight: 700,
          background: gradients.primary,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }
      }>
         Create New Todo
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
        <Input
          value={title}
          onChange={setTitle}
          placeholder="Enter todo title..."
          style={{ fontSize: 16, fontWeight: 600 }}
        />

        <select
          value={selectedExternalId}
          onChange={(e) => {
            const val = e.target.value
            setSelectedExternalId(val ? Number(val) : '')
            if (val && externalTodos) {
              const found = externalTodos.find((it: ExternalTodo) => it.id === Number(val))
              if (found) {
                setTitle(found.title)
                setType('text')
              }
            }
          }}
          disabled={isLoadingExternal}
          style={{
            padding: `${spacing.md}px ${spacing.lg}px`,
            border: `2px solid ${colors.border}`,
            borderRadius: borderRadius.md,
            fontSize: 14,
            fontWeight: 600,
            background: colors.white,
            cursor: isLoadingExternal ? 'not-allowed' : 'pointer',
            outline: 'none',
            transition: 'all 0.3s ease',
            minWidth: 240,
          }}
        >
          <option value="">{isLoadingExternal ? 'Loading todos...' : 'Import from API (optional)'}</option>
          {isErrorExternal && <option disabled>Failed to load</option>}
          {externalTodos && externalTodos.map((ext: ExternalTodo) => (
            <option key={ext.id} value={ext.id}>{ext.title}</option>
          ))}
        </select>

        {/* External actions */}
        {selectedExternalId && (
          <div style={{ display: 'flex', gap: spacing.sm, marginTop: spacing.sm }}>
            <Button
              onClick={async () => {
                const id = Number(selectedExternalId)
                const found = externalTodos?.find(t => t.id === id)
                if (!found) return
                if (!confirm('Delete this external todo?')) return
                try {
                  await deleteExternalMutation.mutateAsync(id)
                  setSelectedExternalId('')
                  setTitle('')
                } catch (err) {
                  console.error('Failed to delete external todo', err)
                }
              }}
              variant="danger"
              style={{ padding: `${spacing.xs}px ${spacing.md}px`, fontSize: 12 }}
            >
              Delete external
            </Button>
          </div>
        )}

        <div style={{ display: 'flex', gap: spacing.md, flexWrap: 'wrap' }}>
          <Button 
            onClick={() => setType('text')} 
            variant={type === 'text' ? 'gradient' : 'default'}
            style={{ flex: '1 1 auto' }}
          >
            📝 Text
          </Button>
          <Button 
            onClick={() => setType('image')} 
            variant={type === 'image' ? 'gradient' : 'default'}
            style={{ flex: '1 1 auto' }}
          >
            🖼️ Image
          </Button>
          <Button 
            onClick={() => setType('location')} 
            variant={type === 'location' ? 'gradient' : 'default'}
            style={{ flex: '1 1 auto' }}
          >
            📍 Location
          </Button>
        </div>

        {type === 'text' && (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your todo content here..."
            rows={4}
            style={{
              padding: `${spacing.lg}px`,
              border: `2px solid ${colors.border}`,
              borderRadius: borderRadius.md,
              fontSize: 15,
              resize: 'vertical',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'all 0.3s ease',
              lineHeight: 1.6
            }}
            onFocus={(e) => {
              e.target.style.borderColor = colors.primary
              e.target.style.boxShadow = `0 0 0 4px ${colors.primary}15`
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.border
              e.target.style.boxShadow = 'none'
            }}
          />
        )}

        {type === 'image' && (
          <Input
            value={imageUrl}
            onChange={setImageUrl}
            placeholder="Paste image URL here..."
          />
        )}

        {type === 'location' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: spacing.md }}>
            <Input
              value={locationData.lat}
              onChange={(val) => setLocationData(prev => ({ ...prev, lat: val }))}
              placeholder="Latitude"
              type="number"
            />
            <Input
              value={locationData.lng}
              onChange={(val) => setLocationData(prev => ({ ...prev, lng: val }))}
              placeholder="Longitude"
              type="number"
            />
            <Input
              value={locationData.address}
              onChange={(val) => setLocationData(prev => ({ ...prev, address: val }))}
              placeholder="Address (optional)"
              style={{ gridColumn: 'span 2' }}
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: spacing.md, alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: `${spacing.md}px ${spacing.lg}px`,
              border: `2px solid ${colors.border}`,
              borderRadius: borderRadius.md,
              fontSize: 14,
              fontWeight: 600,
              background: colors.white,
              cursor: 'pointer',
              minWidth: 180,
              outline: 'none',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = colors.primary
              e.target.style.boxShadow = `0 0 0 4px ${colors.primary}15`
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.border
              e.target.style.boxShadow = 'none'
            }}
          >
            <option value=""> No Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}> {cat.name}</option>
            ))}
          </select>

          {!showCategoryInput && (
            <Button 
              onClick={() => setShowCategoryInput(true)}
            >
               New Category
            </Button>
          )}

          {showCategoryInput && (
            <>
              <Input
                value={newCategoryName}
                onChange={setNewCategoryName}
                placeholder="Category name..."
                style={{ minWidth: 180 }}
              />
              <Button onClick={handleAddCategory} variant="success">
                ✓ Add
              </Button>
              <Button onClick={() => setShowCategoryInput(false)}>
                ✕ Cancel
              </Button>
            </>
          )}
        </div>

        <Button onClick={handleSubmit} variant="gradient" style={{ padding: `${spacing.lg}px`, fontSize: 16 }}>
           Create Todo
        </Button>
      </div>
    </div>
  )
}