'use strict'

import './style.scss'
import { displayResult } from './modules/renderUI.js'
import { constructUrl, getWeatherData } from './modules/getData.js'
import { getUserLocation } from './modules/getUserLocation.js'

getUserLocation()

const submitBtn = document.getElementById('submit')

submitBtn.addEventListener('click', () => {
  let forecastUrl = constructUrl(document.getElementById('location').value)
  ;(async () => {
    displayResult(await getWeatherData(forecastUrl))
  })()
})
