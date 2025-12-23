import type { Todo } from './types'

type Props = {
  archivedTodos: Todo[]
  unarchiveTodo: (id: number | string) => void
}

export default function ArchiveList({ archivedTodos, unarchiveTodo }: Props){
  const list = Array.isArray(archivedTodos) ? archivedTodos : []
  return (
    <div>
      <h2>Archived Todos - { list.length }</h2>
      <ul>
        { list.map(todo => {
          const id = todo.id ?? todo.createdAt
          return (
            <li key={ id }>
              <span>{ todo.title }</span>
              <button onClick={() => unarchiveTodo(id)}> Unarchive </button>
            </li>
          )
        }) }
      </ul>
    </div>
  )
}
