import { useState, useEffect } from 'react'
import { Todo, Category } from '../types'

export function usePersistentData() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = () => {
      try {
        const todosRaw = localStorage.getItem('todos')
        const categoriesRaw = localStorage.getItem('categories')

        if (todosRaw) {
          const parsed = JSON.parse(todosRaw)
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

        if (categoriesRaw) {
          const parsed = JSON.parse(categoriesRaw)
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
    
    const saveData = () => {
      try {
        localStorage.setItem('todos', JSON.stringify(todos))
        localStorage.setItem('categories', JSON.stringify(categories))
      } catch (error) {
        console.error('Failed to save data', error)
      }
    }
    saveData()
  }, [todos, categories, loading])

  return { todos, setTodos, categories, setCategories, loading }
}
