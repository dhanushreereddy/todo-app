import type { Todo } from './types'

type Props = {
  todos: Todo[]
  removeTodo: (id: number | string) => void
  toggleTodo: (id: number | string) => void
  toggleArchive: (id: number | string) => void
}

export default function TodosList({ todos, removeTodo, toggleTodo, toggleArchive }: Props){
  const list = Array.isArray(todos) ? todos : []
  const active = list.filter(t => !t.isCompleted && !t.isArchive)
  const completed = list.filter(t => t.isCompleted && !t.isArchive)

  return <div>
    <h2>Active Todos - { active.length }</h2>
    <ul>
      { active.map((todo) =>{
        const id = todo.id ?? todo.createdAt
        return (
          <li key={ id }>
            <input
              type='checkbox'
              checked={ todo.isCompleted }
              onChange={() => toggleTodo(id)}
              aria-label={`mark ${todo.title} completed`}
            />
            { todo.title }
            <button onClick={() => toggleArchive(id)}> Archive </button>
            <button onClick={() => removeTodo(id)}> Remove </button> 
          </li>
        )
      }) }
    </ul>

    <h2>Completed Todos - { completed.length }</h2>
    <ul>
      { completed.map((todo) =>{
        const id = todo.id ?? todo.createdAt
        return (
          <li key={ id }>
            <input
              type='checkbox'
              checked={ todo.isCompleted }
              onChange={() => toggleTodo(id)}
              aria-label={`mark ${todo.title} active`}
            />
            <s>{ todo.title }</s>
            <button onClick={() => toggleArchive(id)}> Archive </button>
            <button onClick={() => removeTodo(id)}> Remove </button>
          </li>
        )
      }) }
    </ul>
  </div>
}
