'use strict'

import './scss/style.scss'
import { displayResult } from './modules/renderUI.js'
import { constructUrl, getWeatherData } from './modules/getData.js'
import { getUserLocation } from './modules/getUserLocation.js'

import testIcon from './assets/sunCloud.png'

console.log(`Test: ${testIcon}`)

getUserLocation()

const submitBtn = document.getElementById('submit')

submitBtn.addEventListener('click', () => {
  let forecastUrl = constructUrl(document.getElementById('location').value)
  ;(async () => {
    displayResult(await getWeatherData(forecastUrl))
  })()
})
