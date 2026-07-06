import { useEffect, useRef, useState } from 'react'
import type { Shop } from '../types/shop'
import { createMarkerContent, measureMarkerSize } from './MapMarker'
import { DuotoneIcon } from './icons/DuotoneIcon'
import { loadNaverMapsScript } from '../lib/naverMapLoader'
import { useGeolocation } from '../hooks/useGeolocation'

interface MapViewProps {
  shops: Shop[]
  selectedShopId: string | null
  onSelectShop: (id: string) => void
}

const CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID as string | undefined
const SEOUL_METRO_CENTER = { lat: 37.4979, lng: 127.0 }

/** icon.content 사용 시 size/anchor가 없으면 좌표 위치가 깨지므로 항상 함께 계산해서 넣는다. */
function buildMarkerIcon(content: string) {
  const { width, height } = measureMarkerSize(content)
  return { content, size: new window.naver.maps.Size(width, height), anchor: new window.naver.maps.Point(width / 2, height) }
}

export function MapView({ shops, selectedShopId, onSelectShop }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<Map<string, any>>(new Map())
  const userMarkerRef = useRef<any>(null)
  const [mapReady, setMapReady] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const { requestLocation } = useGeolocation()

  // 지도 SDK 로드 + 초기화 (최초 1회)
  useEffect(() => {
    if (!CLIENT_ID) {
      setLoadError('missing-key')
      return
    }
    if (!containerRef.current) return

    loadNaverMapsScript(CLIENT_ID)
      .then(() => {
        const { naver } = window
        mapRef.current = new naver.maps.Map(containerRef.current, {
          center: new naver.maps.LatLng(SEOUL_METRO_CENTER.lat, SEOUL_METRO_CENTER.lng),
          zoom: 10,
          zoomControl: true,
          zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
        })
        setMapReady(true)
      })
      .catch((err: Error) => setLoadError(err.message))
  }, [])

  // 필터링된 shops에 맞춰 마커 생성/갱신/제거 + 화면에 맞게 bounds 조정
  useEffect(() => {
    if (!mapReady || !mapRef.current) return
    const { naver } = window
    const map = mapRef.current
    const currentIds = new Set(shops.map((s) => s.id))

    for (const [id, marker] of markersRef.current) {
      if (!currentIds.has(id)) {
        marker.setMap(null)
        markersRef.current.delete(id)
      }
    }

    if (shops.length === 0) return

    const bounds = new naver.maps.LatLngBounds(
      new naver.maps.LatLng(shops[0].lat, shops[0].lng),
      new naver.maps.LatLng(shops[0].lat, shops[0].lng),
    )

    shops.forEach((shop) => {
      const position = new naver.maps.LatLng(shop.lat, shop.lng)
      bounds.extend(position)
      const selected = shop.id === selectedShopId
      const existing = markersRef.current.get(shop.id)

      if (existing) {
        existing.setIcon(buildMarkerIcon(createMarkerContent(shop, selected)))
        return
      }

      const marker = new naver.maps.Marker({
        position,
        map,
        icon: buildMarkerIcon(createMarkerContent(shop, selected)),
      })
      naver.maps.Event.addListener(marker, 'click', () => onSelectShop(shop.id))
      markersRef.current.set(shop.id, marker)
    })

    map.fitBounds(bounds, { top: 80, right: 60, bottom: 80, left: 60 })
  }, [mapReady, shops, selectedShopId, onSelectShop])

  const handleLocate = () => {
    requestLocation(({ lat, lng }) => {
      if (!mapReady || !mapRef.current) return
      const { naver } = window
      const position = new naver.maps.LatLng(lat, lng)
      mapRef.current.panTo(position)
      mapRef.current.setZoom(14)

      if (userMarkerRef.current) {
        userMarkerRef.current.setPosition(position)
      } else {
        userMarkerRef.current = new naver.maps.Marker({
          position,
          map: mapRef.current,
          icon: {
            content: '<div class="user-location-dot"></div>',
            size: new naver.maps.Size(16, 16),
            anchor: new naver.maps.Point(8, 8),
          },
        })
      }
    })
  }

  return (
    <div className="map-area">
      <div ref={containerRef} className="map-container" />

      {loadError && (
        <div className="map-fallback">
          {loadError === 'missing-key' ? (
            <>
              <h3>네이버 지도 API 키가 설정되지 않았습니다</h3>
              <p>
                프로젝트 루트에 <code>.env</code> 파일을 만들고{' '}
                <code>VITE_NAVER_MAP_CLIENT_ID</code>를 설정한 뒤 dev 서버를 재시작해주세요.
              </p>
            </>
          ) : (
            <>
              <h3>지도를 불러오지 못했습니다</h3>
              <p>{loadError}</p>
            </>
          )}
        </div>
      )}

      <button className="locate-btn" onClick={handleLocate} title="현재 위치">
        <DuotoneIcon name="locate" size={20} />
      </button>
    </div>
  )
}
