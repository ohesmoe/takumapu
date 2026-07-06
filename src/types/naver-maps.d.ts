/**
 * 네이버 지도 JS SDK는 공식 타입 선언을 제공하지 않아 window.naver를 any로 최소 선언.
 */
interface Window {
  naver: any
  navermap_authFailure?: () => void
}
