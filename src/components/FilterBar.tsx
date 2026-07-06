import type { ShopCategory } from '../types/shop'

const CATEGORIES: ShopCategory[] = ['피규어', '굿즈', '만화책', '중고', '코스프레']

export type SortOption = '이름순' | '지역순'
const SORT_OPTIONS: SortOption[] = ['이름순', '지역순']

interface FilterBarProps {
  activeCategory: ShopCategory | null
  onCategoryChange: (category: ShopCategory | null) => void
  sort: SortOption
  onSortChange: (sort: SortOption) => void
}

export function FilterBar({ activeCategory, onCategoryChange, sort, onSortChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <button
        className={`btn-chip ${activeCategory === null ? 'active' : ''}`}
        onClick={() => onCategoryChange(null)}
      >
        전체
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={`btn-chip ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
      <span style={{ width: 1, background: 'var(--border)', margin: '0 4px' }} />
      {SORT_OPTIONS.map((option) => (
        <button
          key={option}
          className={`btn-chip ${sort === option ? 'active' : ''}`}
          onClick={() => onSortChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
