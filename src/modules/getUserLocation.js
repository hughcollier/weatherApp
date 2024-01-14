import { constructUrl, getWeatherData } from './getData.js'
import { displayResult } from './renderUI.js'

const getCurrentLocation = function (position) {
  let forecastUrl = constructUrl(
    `${position.coords.latitude},${position.coords.longitude}`
  )
  getWeatherData(forecastUrl).then(data => displayResult(data))
}

const handleGeolocationError = function (error) {
  console.warn(error.message, error.code)
}

const getUserLocation = function () {
  const getCurrenLocationButton = document.getElementById(
    'getCurrenLocationButton'
  )

  if ('geolocation' in navigator) {
    console.log('geoloaction is available')
    getCurrenLocationButton.classList.remove('hidden')
    getCurrenLocationButton.addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition(
        getCurrentLocation,
        handleGeolocationError
      )
    })
  } else {
    console.log('geoloaction not available')
  }
}

export { getUserLocation }
