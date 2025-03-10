import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const APIkey = import.meta.env.VITE_SOME_KEY


const getWeather = (city) => {
  const request = axios.get(baseUrl + city + '&appid=' + APIkey)
  return request.then((response) => response.data)
}


export default {
  getWeather
}