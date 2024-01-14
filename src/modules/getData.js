const url = new URL('https://api.weatherapi.com/v1')
const constructUrl = function (searchString) {
  url.search = `?key=${process.env.API_KEY}&q=${searchString}&days=3&aqi=no&alerts=no`
  url.pathname = '/v1'
  url.pathname += '/forecast.json'
  return url
}

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

export { constructUrl, getWeatherData }
