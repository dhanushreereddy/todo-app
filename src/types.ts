export type TodoType = 'text' | 'image' | 'location'

export interface Todo {
  id: string | number
  createdAt: number
  title: string
  isCompleted: boolean
  isArchive: boolean
  category?: string
  type: TodoType
  content: string
  imageUrl?: string
  location?: {
    lat: number
    lng: number
    address?: string
  }
}

export interface FilterState {
  query: string
  fromDate: string
  toDate: string
  sortOrder: 'asc' | 'desc'
  category: string
  type: 'all' | TodoType
}

export interface Category {
  id: string
  name: string
  color: string
}

export interface ExternalTodo {
  userId: number
  id: number
  title: string
  completed: boolean
}
