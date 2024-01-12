const url = new URL('https://api.weatherapi.com/v1')
const constructUrl = function (endpoint, searchString) {
  url.search = `?key=${process.env.API_KEY}&q=${searchString}`
  url.pathname = '/v1'
  url.pathname += endpoint
  return url
}

export { constructUrl }
