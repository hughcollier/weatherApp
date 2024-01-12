const weatherEl = document.getElementById('weather')

const displayResult = function (weatherDataObject) {
  weatherEl.textContent = `The weather in ${
    weatherDataObject.location.name
  } is ${weatherDataObject.current.condition.text.toLowerCase()} and the temperature is ${
    weatherDataObject.current.temp_c
  }ºC`
}

export { displayResult }
