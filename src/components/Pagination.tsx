import { Button } from './Button'
import { spacing, colors, borderRadius } from '../styles'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  itemsPerPage: number
  totalItems: number
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  itemsPerPage,
  totalItems
}: PaginationProps) {
  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      
      if (currentPage > 3) {
        pages.push('...')
      }
      
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...')
      }
      
      pages.push(totalPages)
    }
    
    return pages
  }

  return (
    <div style={{ 
      marginTop: spacing.xl,
      padding: spacing.lg,
      background: colors.white,
      borderRadius: borderRadius.lg,
      border: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: spacing.md
    }}>
      <div style={{ color: colors.textMuted, fontSize: 14 }}>
        Showing {startItem}-{endItem} of {totalItems} notes
      </div>
      
      <div style={{ display: 'flex', gap: spacing.xs, alignItems: 'center' }}>
        <Button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ padding: `${spacing.xs}px ${spacing.md}px` }}
        >
          ← Previous
        </Button>
        
        {getPageNumbers().map((page, idx) => (
          page === '...' ? (
            <span key={`ellipsis-${idx}`} style={{ padding: `0 ${spacing.xs}px`, color: colors.textMuted }}>
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              style={{
                padding: `${spacing.xs}px ${spacing.md}px`,
                border: `1px solid ${colors.border}`,
                borderRadius: borderRadius.sm,
                background: currentPage === page ? colors.primary : colors.white,
                color: currentPage === page ? colors.white : colors.text,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                minWidth: 36,
              }}
            >
              {page}
            </button>
          )
        ))}
        
        <Button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ padding: `${spacing.xs}px ${spacing.md}px` }}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}