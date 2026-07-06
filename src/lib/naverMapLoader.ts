const SCRIPT_ID = 'naver-maps-sdk'

let loadPromise: Promise<void> | null = null

/**
 * 네이버 지도 JS SDK를 1회만 동적으로 로드. ncpClientId 인증 실패 시 reject.
 */
export function loadNaverMapsScript(clientId: string): Promise<void> {
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    if (window.naver?.maps) {
      resolve()
      return
    }

    window.navermap_authFailure = () => {
      reject(new Error('네이버 지도 인증에 실패했습니다. Client ID와 Web 서비스 URL 등록을 확인해주세요.'))
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('네이버 지도 SDK 스크립트를 불러오지 못했습니다.'))
    document.head.appendChild(script)
  })

  return loadPromise
}
