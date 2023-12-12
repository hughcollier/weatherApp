'use strict'

import './style.scss'

const submitBtn = document.getElementById('submit')
const getCurrenLocationButton = document.getElementById(
  'getCurrenLocationButton'
)
const weatherEl = document.getElementById('weather')
const url = new URL('https://api.weatherapi.com/v1/current.json')
let searchString

const getWeatherData = async function () {
  try {
    let response = await fetch(url)
    let dataObject = await response.json()
    if (!response.ok) throw new Error('Something went wrong.')
    displayResult(dataObject)
  } catch (error) {
    console.warn(error.message)
  }
}
const displayResult = function (dataObject) {
  console.log(dataObject)
  weatherEl.textContent = `The weather in ${
    dataObject.location.name
  } is ${dataObject.current.condition.text.toLowerCase()} and the temperature is ${
    dataObject.current.temp_c
  }ºC`
}

const buildSearchString = function (searchString) {
  url.search = `?key=${process.env.API_KEY}&q=${searchString}&aqi=no`
}

const getCurrentLocation = function (position) {
  buildSearchString(`${position.coords.latitude}, ${position.coords.longitude}`)
  getWeatherData()
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
  buildSearchString(document.getElementById('location').value)
  getWeatherData()
})
