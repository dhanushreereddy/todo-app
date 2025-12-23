export interface Todo {
  id: string | number
  createdAt: number
  title: string
  isCompleted: boolean
  isArchive: boolean
  category?: string
  type: 'text' | 'image' | 'location'
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
  type: 'all' | 'text' | 'image' | 'location'
}

export interface Category {
  id: string
  name: string
  color: string
}

declare global {
  interface Window {
    storage: {
      get: (key: string, shared?: boolean) => Promise<{ key: string; value: string; shared: boolean } | null>
      set: (key: string, value: string, shared?: boolean) => Promise<{ key: string; value: string; shared: boolean } | null>
      delete: (key: string, shared?: boolean) => Promise<{ key: string; deleted: boolean; shared: boolean } | null>
      list: (prefix?: string, shared?: boolean) => Promise<{ keys: string[]; prefix?: string; shared: boolean } | null>
    }
  }
}