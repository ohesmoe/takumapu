export type IconName = 'search' | 'pin' | 'locate' | 'close' | 'external' | 'store'

interface DuotoneIconProps {
  name: IconName
  size?: number
  className?: string
}

/**
 * 듀오톤 아이콘: 옅은 채움(.secondary, opacity .25) + 진한 외곽선.
 * Phosphor duotone 스타일을 단순화해 인라인 SVG로 구현.
 */
export function DuotoneIcon({ name, size = 24, className = '' }: DuotoneIconProps) {
  return (
    <svg
      className={`icon ${className}`}
      style={{ width: size, height: size }}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      {ICON_PATHS[name]}
    </svg>
  )
}

const ICON_PATHS: Record<IconName, JSX.Element> = {
  search: (
    <>
      <path
        className="secondary"
        d="M116 200a84 84 0 1 0 0-168 84 84 0 0 0 0 168Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M116 200a84 84 0 1 0 0-168 84 84 0 0 0 0 168ZM224 224l-52.5-52.5"
      />
    </>
  ),
  pin: (
    <>
      <path
        className="secondary"
        d="M128 24c-48.6 0-88 39.4-88 88 0 66 88 120 88 120s88-54 88-120c0-48.6-39.4-88-88-88Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M128 24c-48.6 0-88 39.4-88 88 0 66 88 120 88 120s88-54 88-120c0-48.6-39.4-88-88-88Z"
      />
      <circle cx="128" cy="112" r="28" stroke="currentColor" strokeWidth="16" fill="none" />
    </>
  ),
  locate: (
    <>
      <circle className="secondary" cx="128" cy="128" r="64" />
      <circle cx="128" cy="128" r="64" stroke="currentColor" strokeWidth="16" fill="none" />
      <circle cx="128" cy="128" r="16" fill="currentColor" />
      <path
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        d="M128 16v32M128 208v32M16 128h32M208 128h32"
      />
    </>
  ),
  close: (
    <>
      <circle className="secondary" cx="128" cy="128" r="104" />
      <path
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        d="M168 88 88 168M88 88l80 80"
      />
    </>
  ),
  external: (
    <>
      <path
        className="secondary"
        d="M200 136v64a8 8 0 0 1-8 8H56a8 8 0 0 1-8-8V72a8 8 0 0 1 8-8h64"
      />
      <path
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M200 136v64a8 8 0 0 1-8 8H56a8 8 0 0 1-8-8V72a8 8 0 0 1 8-8h64M144 40h72v72M96 160l120-120"
      />
    </>
  ),
  store: (
    <>
      <path
        className="secondary"
        d="M40 96l16-56h144l16 56v16a24 24 0 0 1-24 24 24 24 0 0 1-24-24 24 24 0 0 1-48 0 24 24 0 0 1-48 0 24 24 0 0 1-24-24Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="16"
        strokeLinejoin="round"
        fill="none"
        d="M40 96l16-56h144l16 56M40 96v16a24 24 0 0 0 24 24 24 24 0 0 0 24-24M88 112a24 24 0 0 0 24 24 24 24 0 0 0 24-24M136 112a24 24 0 0 0 24 24 24 24 0 0 0 24-24M216 112v16a24 24 0 0 1-24 24 24 24 0 0 1-24-24"
      />
      <path stroke="currentColor" strokeWidth="16" strokeLinejoin="round" fill="none" d="M56 216v-80M200 216v-80" />
      <path stroke="currentColor" strokeWidth="16" strokeLinejoin="round" fill="none" d="M56 216h144" />
    </>
  ),
}
