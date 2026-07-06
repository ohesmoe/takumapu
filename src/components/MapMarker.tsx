import type { Shop } from '../types/shop'

const PIN_SVG =
  '<svg class="icon" viewBox="0 0 256 256" width="14" height="14" xmlns="http://www.w3.org/2000/svg">' +
  '<path class="secondary" d="M128 24c-48.6 0-88 39.4-88 88 0 66 88 120 88 120s88-54 88-120c0-48.6-39.4-88-88-88Z"/>' +
  '<path stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M128 24c-48.6 0-88 39.4-88 88 0 66 88 120 88 120s88-54 88-120c0-48.6-39.4-88-88-88Z"/>' +
  '<circle cx="128" cy="112" r="28" stroke="currentColor" stroke-width="16" fill="none"/>' +
  '</svg>'

/**
 * 네이버 지도 marker.icon.content로 넣을 HTML 문자열.
 * index.css의 .marker 스타일을 그대로 재사용해 디자인 시스템과 일치시킴.
 */
export function createMarkerContent(shop: Shop, selected: boolean): string {
  return `<button class="marker${selected ? ' selected' : ''}" type="button">${PIN_SVG}${shop.name}</button>`
}

/**
 * 네이버 지도는 icon.content 사용 시 size/anchor를 명시하지 않으면
 * 좌표 기반 위치 계산을 하지 못해 모든 마커가 한 지점에 겹치는 문제가 있다.
 * 화면 밖에 실제로 렌더링해 크기를 잰 뒤 anchor(하단 중앙)를 계산한다.
 */
export function measureMarkerSize(html: string): { width: number; height: number } {
  const temp = document.createElement('div')
  temp.style.position = 'absolute'
  temp.style.visibility = 'hidden'
  temp.style.left = '-9999px'
  temp.style.top = '-9999px'
  temp.innerHTML = html
  document.body.appendChild(temp)
  const rect = (temp.firstElementChild as HTMLElement).getBoundingClientRect()
  document.body.removeChild(temp)
  return { width: rect.width, height: rect.height }
}
