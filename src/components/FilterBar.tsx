import type { ShopCategory } from '../types/shop'

const CATEGORIES: ShopCategory[] = ['피규어', '굿즈', '만화책', '코스프레']

interface FilterBarProps {
  activeCategory: ShopCategory | null
  onCategoryChange: (category: ShopCategory | null) => void
}

export function FilterBar({ activeCategory, onCategoryChange }: FilterBarProps) {
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
    </div>
  )
}
