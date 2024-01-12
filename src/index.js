'use strict'

import './style.scss'
import { displayResult } from './modules/renderUI.js'
import { constructUrl } from './modules/getData.js'

const submitBtn = document.getElementById('submit')

let searchString, currentWeatherUrl, astronomyUrl, weather, forecastUrl

// I can actually get all the data I need from the /forecast endpoint but since this is a learning project I'm going to fetch the current weather and astronomy data from separate endpoints so I can get get some practice using Promise.all()

// This function should just return the weather data object rather than call displayResults. (This can be done inside the event listener on the submit button)
const getWeatherData = async function (forecastUrl) {
  try {
    let forecast = await fetch(forecastUrl)
    let forecastDataObject = await forecast.json()
    if (!forecast.ok) throw new Error('Something went wrong.')

    console.log(forecastDataObject)
    return forecastDataObject
  } catch (error) {
    console.warn(error.message)
  }
}

const getCurrentLocation = function (position) {
  searchString = `${position.coords.latitude},${position.coords.longitude}`
  forecastUrl = constructUrl('/forecast.json', searchString)
  forecastUrl += '&days=3&aqi=no&alerts=no'

  let weatherObject = getWeatherData(forecastUrl)
  displayResult(weatherObject)
}

const handleGeolocationError = function (error) {
  console.warn(error.message, error.code)
}

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

submitBtn.addEventListener('click', () => {
  searchString = document.getElementById('location').value
  forecastUrl = constructUrl('/forecast.json', searchString)
  forecastUrl += '&days=3&aqi=no&alerts=no'

  getWeatherData(forecastUrl).then(data => displayResult(data))

  //
})
