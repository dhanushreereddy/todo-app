import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ExternalTodo } from '../types'
// import { EXTERNAL_TODOS_URL } from '../config'

export function useExternalTodos() {
  return useQuery<ExternalTodo[]>({
    queryKey: ['externalTodos'],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
      if (!res.ok) throw new Error('Failed to fetch external todos')
      return await res.json() as ExternalTodo[]
    }
  })
}


// Optimistic delete for external todo (DELETE)
export function useDeleteExternalTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    
    mutationFn: async (id: number) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to delete')
    },

    // update: Remove from UI immediately
    onMutate: async (id: number) => {

      // cancel ongoing refetches and save current state
      await queryClient.cancelQueries({ queryKey: ['externalTodos'] })
      const previousTodos = queryClient.getQueryData<ExternalTodo[]>(['externalTodos'])
      
      // update ui
      queryClient.setQueryData<ExternalTodo[]>(['externalTodos'], (old) => 
        old?.filter(todo => todo.id !== id)
      )
      return { previousTodos }
    },

    onError: (_error, _id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['externalTodos'], context.previousTodos)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['externalTodos'] })
    }
  })
}