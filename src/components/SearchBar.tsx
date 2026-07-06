import { DuotoneIcon } from './icons/DuotoneIcon'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <DuotoneIcon name="search" size={18} />
      <input
        type="text"
        placeholder="굿즈샵 이름, 지역으로 검색"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
