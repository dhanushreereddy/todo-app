import { Todo, Category } from '../types'
import { ArchivedTodoItem } from './ArchivedTodoItem'
import { spacing, colors, borderRadius } from '../styles'

interface ArchiveListProps {
  archivedTodos: Todo[]
  unarchiveTodo: (id: string | number) => void
  categories: Category[]
}

export function ArchiveList({ 
  archivedTodos, 
  unarchiveTodo,
  categories
}: ArchiveListProps) {
  if (archivedTodos.length === 0) return <p>No Archived Todos</p>

  return (
    <div style={{ 
      marginTop: spacing.xl, 
      paddingTop: spacing.lg, 
      borderTop: `1px solid ${colors.border}` 
    }}>
      <h3 style={{ 
        color: colors.textMuted,
        marginBottom: spacing.md,
        fontSize: 18,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm
      }}>
         Archived
        <span style={{ 
          background: colors.textMuted,
          color: colors.white,
          padding: `${spacing.xs}px ${spacing.md}px`,
          borderRadius: borderRadius.sm,
          fontSize: 14,
          fontWeight: 500
        }}>
          {archivedTodos.length}
        </span>
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {archivedTodos.map((todo) => (
          <ArchivedTodoItem
            key={todo.id}
            todo={todo}
            onUnarchive={() => unarchiveTodo(todo.id)}
            categories={categories}
          />
        ))}
      </ul>
    </div>
  )
}