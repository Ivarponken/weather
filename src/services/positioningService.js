export function getPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported by this browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const long = pos.coords.longitude

        // Default name if reverse geocoding fails
        let name = 'Current location'

        try {
          // Use OpenStreetMap Nominatim reverse geocoding (no API key).
          // Keep request light and use format=jsonv2 for structured address.
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`
          const resp = await fetch(url)
          if (resp.ok) {
            const data = await resp.json()
            // Prefer city/town/village, fall back to county or display_name
            name =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.county ||
              data.display_name ||
              name
          }
        } catch (e) {
          // ignore errors and use fallback name
          // console.warn('Reverse geocoding failed', e)
        }

        resolve({
          position: {
            lat,
            long,
            name,
          },
        })
      },
      (err) => {
        reject(err)
      },
    )
  })
}
