import type { Shop } from '../types/shop'
import { DuotoneIcon } from './icons/DuotoneIcon'

interface ShopCardProps {
  shop: Shop
  onClose: () => void
}

export function ShopCard({ shop, onClose }: ShopCardProps) {
  return (
    <div className="shop-card">
      <button className="shop-card__close" onClick={onClose} aria-label="닫기">
        <DuotoneIcon name="close" size={20} />
      </button>
      <span className="shop-card__category">{shop.category}</span>
      <h2>{shop.name}</h2>
      <p style={{ color: 'var(--sub)', fontSize: 13 }}>{shop.description}</p>

      <div className="shop-card__row">
        <DuotoneIcon name="pin" size={16} />
        <span>{shop.address}</span>
      </div>

      <div className="shop-card__tags">
        {shop.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <a
        className="btn shop-card__link"
        href={shop.naverMapUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <DuotoneIcon name="external" size={16} />
        네이버 지도에서 보기
      </a>
    </div>
  )
}
