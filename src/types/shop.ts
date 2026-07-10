export type ShopCategory = '피규어' | '굿즈' | '만화책' | '중고' | '코스프레'

export interface Shop {
  id: string
  name: string
  category: ShopCategory
  area: string
  address: string
  description: string
  tags: string[]
  lat: number
  lng: number
}
