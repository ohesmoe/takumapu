import { useMemo, useState } from 'react'
import { Header } from './components/Header'
import { FilterBar } from './components/FilterBar'
import { MapView } from './components/MapView'
import { ShopCard } from './components/ShopCard'
import { shops } from './data/shops'
import type { ShopCategory } from './types/shop'

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ShopCategory | null>(null)
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null)

  const filteredShops = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return shops.filter((shop) => {
      const matchesKeyword =
        keyword === '' ||
        shop.name.toLowerCase().includes(keyword) ||
        shop.area.toLowerCase().includes(keyword)
      const matchesCategory = category === null || shop.category === category
      return matchesKeyword && matchesCategory
    })
  }, [query, category])

  const selectedShop = filteredShops.find((shop) => shop.id === selectedShopId) ?? null

  return (
    <div className="app">
      <Header query={query} onQueryChange={setQuery} />
      <FilterBar activeCategory={category} onCategoryChange={setCategory} />
      <main className="app-main">
        <MapView
          shops={filteredShops}
          selectedShopId={selectedShopId}
          onSelectShop={setSelectedShopId}
        />
        {selectedShop && <ShopCard shop={selectedShop} onClose={() => setSelectedShopId(null)} />}
      </main>
    </div>
  )
}

export default App
