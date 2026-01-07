import { FilterState, Category } from '../types'
import { Input } from './Input'
import { Button } from './Button'
import { spacing, colors, borderRadius } from '../styles'

interface FilterControlsProps {
  filters: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
  onClearFilters: () => void
  categories: Category[]
}

export function FilterControls({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  categories
}: FilterControlsProps) {
  return (
    <div style={{ 
      margin: `${spacing.lg}px 0`,
      padding: spacing.lg,
      background: colors.background,
      borderRadius: borderRadius.lg,
      border: `1px solid ${colors.border}`,
      boxShadow: `0 1px 3px ${colors.shadow}`
    }}>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: spacing.md,
        alignItems: 'center'
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span style={{ fontWeight: 500, fontSize: 14, color: colors.text }}>🔍 Search:</span>
          <Input
            value={filters.query}
            onChange={(value) => onFilterChange({ query: value })}
            placeholder="Filter by title..."
            style={{ minWidth: 180 }}
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span style={{ fontWeight: 500, fontSize: 14, color: colors.text }}> Category:</span>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            style={{
              padding: `${spacing.sm}px ${spacing.md}px`,
              border: `1px solid ${colors.border}`,
              borderRadius: borderRadius.sm,
              fontSize: 14,
              background: colors.white,
              cursor: 'pointer',
              minWidth: 150
            }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
            <option value="none">No Category</option>
          </select>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span style={{ fontWeight: 500, fontSize: 14, color: colors.text }}> Type:</span>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ type: e.target.value as FilterState['type'] })}
            style={{
              padding: `${spacing.sm}px ${spacing.md}px`,
              border: `1px solid ${colors.border}`,
              borderRadius: borderRadius.sm,
              fontSize: 14,
              background: colors.white,
              cursor: 'pointer',
              minWidth: 120
            }}
          >
            <option value="all">All Types</option>
            <option value="text"> Text</option>
            <option value="image"> Image</option>
            <option value="location"> Location</option>
          </select>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span style={{ fontWeight: 500, fontSize: 14, color: colors.text }}>📅 From:</span>
          <Input
            type="date"
            value={filters.fromDate}
            onChange={(value) => onFilterChange({ fromDate: value })}
            style={{ minWidth: 140 }}
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span style={{ fontWeight: 500, fontSize: 14, color: colors.text }}>📅 To:</span>
          <Input
            type="date"
            value={filters.toDate}
            onChange={(value) => onFilterChange({ toDate: value })}
            style={{ minWidth: 140 }}
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span style={{ fontWeight: 500, fontSize: 14, color: colors.text }}> Sort:</span>
          <select 
            value={filters.sortOrder} 
            onChange={(e) => onFilterChange({ sortOrder: e.target.value as 'asc' | 'desc' })}
            style={{ 
              padding: `${spacing.sm}px ${spacing.md}px`,
              border: `1px solid ${colors.border}`,
              borderRadius: borderRadius.sm,
              fontSize: 14,
              background: colors.white,
              cursor: 'pointer'
            }}
          >
            <option value="asc">Oldest first ↑</option>
            <option value="desc">Newest first ↓</option>
          </select>
        </label>

        <Button onClick={onClearFilters}>
          🔄 Clear Filters
        </Button>
      </div>
    </div>
  )
}
