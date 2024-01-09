'use strict'

import './style.scss'

const submitBtn = document.getElementById('submit')
const getCurrenLocationButton = document.getElementById(
  'getCurrenLocationButton'
)
const weatherEl = document.getElementById('weather')
const url = new URL('https://api.weatherapi.com/v1')
let searchString, currentWeatherUrl, astronomyUrl, weather, forecastUrl

// I can actually get all the data I need from the /forecast endpoint but since this is a learning project I'm going to fetch the current weather and astronomy data from separate endpoints so I can get get some practice using Promise.all()

const getWeatherData = async function (
  currentWeatherUrl,
  astronomyUrl,
  forecastUrl
) {
  try {
    let [weather, moon, forecast] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(astronomyUrl),
      fetch(forecastUrl),
    ])

    let weatherDataObject = await weather.json()
    console.log(weatherDataObject)
    let moonDataObject = await moon.json()
    console.log(moonDataObject)
    let forecastDataObject = await forecast.json()
    console.log(forecastDataObject)

    if (!weather.ok || !moon.ok) throw new Error('Something went wrong.')

    displayResult(weatherDataObject)
  } catch (error) {
    console.warn(error.message)
  }
}
const displayResult = function (weatherDataObject) {
  weatherEl.textContent = `The weather in ${
    weatherDataObject.location.name
  } is ${weatherDataObject.current.condition.text.toLowerCase()} and the temperature is ${
    weatherDataObject.current.temp_c
  }ºC`
}

const constructUrl = function (endpoint, searchString) {
  url.search = `?key=${process.env.API_KEY}&q=${searchString}`
  url.pathname = '/v1'
  url.pathname += endpoint
  return url
}

const getCurrentLocation = function (position) {
  searchString = `${position.coords.latitude},${position.coords.longitude}`
  currentWeatherUrl = constructUrl('/current.json', searchString)
  currentWeatherUrl += '&aqi=no'

  astronomyUrl = constructUrl('/astronomy.json', searchString)

  forecastUrl = constructUrl('/forecast.json', searchString)
  forecastUrl += '&days=3&aqi=no&alerts=no'

  getWeatherData(currentWeatherUrl, astronomyUrl, forecastUrl)
}

const handleGeolocationError = function (error) {
  console.warn(error.message, error.code)
}

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
  currentWeatherUrl = constructUrl('/current.json', searchString)
  currentWeatherUrl += '&aqi=no'

  astronomyUrl = constructUrl('/astronomy.json', searchString)

  forecastUrl = constructUrl('/forecast.json', searchString)
  forecastUrl += '&days=3&aqi=no&alerts=no'

  getWeatherData(currentWeatherUrl, astronomyUrl, forecastUrl)
})
