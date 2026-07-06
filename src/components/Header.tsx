import { DuotoneIcon } from './icons/DuotoneIcon'
import { SearchBar } from './SearchBar'

interface HeaderProps {
  query: string
  onQueryChange: (value: string) => void
}

export function Header({ query, onQueryChange }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <DuotoneIcon name="store" size={28} />
        <h1>
          TAKUMAPU <span style={{ color: 'var(--primary)' }}>타쿠마푸</span>
        </h1>
      </div>
      <SearchBar value={query} onChange={onQueryChange} />
    </header>
  )
}
