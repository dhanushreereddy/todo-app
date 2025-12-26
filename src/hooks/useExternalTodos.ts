import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ExternalTodo } from '../types'
import { EXTERNAL_TODOS_URL } from '../config'

export function useExternalTodos() {
  return useQuery<ExternalTodo[]>({
    queryKey: ['externalTodos'],
    queryFn: async () => {
      const res = await fetch(EXTERNAL_TODOS_URL)
      if (!res.ok) throw new Error('Failed to fetch external todos')
      return await res.json() as ExternalTodo[]
    }
  })
}


// Optimistic delete for external todo (DELETE)
export function useDeleteExternalTodo() {
  const qc = useQueryClient()

  return useMutation<void, Error, number, { previous?: ExternalTodo[] }>({
    mutationFn: async (id) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to delete external todo')
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['externalTodos'] })
      const previous = qc.getQueryData<ExternalTodo[]>(['externalTodos'])
      qc.setQueryData<ExternalTodo[]>(['externalTodos'], (old) => old ? old.filter(t => t.id !== id) : old)
      return { previous }
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) qc.setQueryData(['externalTodos'], context.previous)
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['externalTodos'] })
    }
  })
}
