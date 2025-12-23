import React, { useState } from 'react'
import type { Todo } from './types'

type AddTodoProps = {
  addTodo: (todo: Todo) => void
}

export default function AddTodo({ addTodo }: AddTodoProps){
  const [input, setInput] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(input.trim().length > 0){
      const now = Date.now()
      const data: Todo = {
        id: now,
        createdAt: now,
        isCompleted: false,
        title: input.trim(),
        isArchive: false
      }
      // eslint-disable-next-line no-console
      console.log(data)
      addTodo(data)
      setInput('')
    }
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="add todo"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
    </form>
  </div>
}
