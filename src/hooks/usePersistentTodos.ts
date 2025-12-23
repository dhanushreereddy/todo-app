import { useState, useEffect } from 'react'
import { Todo, Category } from '../types'

export function usePersistentData() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [todosResult, categoriesResult] = await Promise.all([
          window.storage.get('todos'),
          window.storage.get('categories')
        ])
        
        if (todosResult?.value) {
          const parsed = JSON.parse(todosResult.value)
          if (Array.isArray(parsed)) {
            setTodos(parsed.map((t: any) => ({
              id: t.id ?? t.createdAt ?? Date.now(),
              createdAt: t.createdAt ?? Date.now(),
              title: String(t.title ?? ''),
              isCompleted: Boolean(t.isCompleted),
              isArchive: Boolean(t.isArchive),
              category: t.category,
              type: t.type || 'text',
              content: t.content || '',
              imageUrl: t.imageUrl,
              location: t.location
            })))
          }
        }
        
        if (categoriesResult?.value) {
          const parsed = JSON.parse(categoriesResult.value)
          if (Array.isArray(parsed)) {
            setCategories(parsed)
          }
        }
      } catch (error) {
        console.log('No saved data found')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (loading) return
    
    const saveData = async () => {
      try {
        await Promise.all([
          window.storage.set('todos', JSON.stringify(todos)),
          window.storage.set('categories', JSON.stringify(categories))
        ])
      } catch (error) {
        console.error('Failed to save data', error)
      }
    }
    saveData()
  }, [todos, categories, loading])

  return { todos, setTodos, categories, setCategories, loading }
}
