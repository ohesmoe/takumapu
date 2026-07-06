interface GeolocationState {
  requestLocation: (onSuccess: (position: { lat: number; lng: number }) => void) => void
}

export function useGeolocation(): GeolocationState {
  const requestLocation = (onSuccess: (position: { lat: number; lng: number }) => void) => {
    if (!navigator.geolocation) {
      window.alert('이 브라우저는 위치 정보를 지원하지 않습니다.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => onSuccess({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => window.alert('위치 정보를 가져올 수 없습니다. 브라우저 위치 권한을 확인해주세요.'),
    )
  }

  return { requestLocation }
}
