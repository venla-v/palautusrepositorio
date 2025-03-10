import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'
import weatherService from './services/weather'

const Image = ( {url} ) => {
  return (
    <img src={url}/>
  )
}

const Countries = ({ country, showInfo }) => {
  if (!country) {
    return null
  }

  if (country.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (country.length === 1) {
    console.log(country)
    console.log(country[0].languages)

    return (
      <>
        <CountryInfo country={country[0]}/>
       
      </>
    )
  }

  return ( 
      <div> {country.map(c => (
        <div key={c.name.common}>{c.name.common}
        <button onClick={() => showInfo(c)}>show</button>
        </div>
      ))}</div>
  )
}

const CountryInfo = ({ country }) => {
  const countryLanguages = Object.values(country.languages);
  console.log(country.capital)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <div>
        {countryLanguages.map((language) => (
          <div key={language}>{language}</div>
        ))}
      </div>
      <div>
        <Image url={country.flags.png} />
      </div>
      <div>
        <Weather capital={country.capital} />
      </div>
    </div>
  )
};

const Weather = ({ capital }) => {
  console.log(capital)
  const [weather, setWeather] = useState(null);

  useEffect(() => {
      weatherService
        .getWeather(capital)
        .then(response => setWeather(response))
  }, [capital]);
  console.log(weather)

  
  if (weather !== null) {
    let temp = weather.main.temp - 273.15
    temp = temp.toFixed(2)

    let iconBaseUrl = 'https://openweathermap.org/img/wn/'
    let iconCode = weather.weather[0].icon
  
  return (
    
    <>
    <h2>Weather in {capital}</h2>
    <div>Temperature: {temp} Celsius</div>
    <div><Image url={iconBaseUrl + iconCode + '@2x.png'} /></div>
    <div>Wind: {weather.wind.speed} m/s</div>
    </>
  )
}
return (
    
  <>
  <div>Temperature:</div>
  <div>Wind: </div>
  </>
)
};



const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [shown, setShown] = useState(null);
  


  useEffect(() => {
      countryService.getAll()
      .then(response => {setCountries(response)})
      
  }, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
    setShown(null)
  }

  const showInfo = (country) => {
    console.log(country)
    setShown(country)
  }

  const countriesShown = search
   ? countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
   : countries

if (!shown) {
  return (
    <div>
      <div>
        find countries: <input value={search} onChange={handleChange} />
      </div>
      <div>
      <Countries country={countriesShown} showInfo={showInfo}/>
      </div>
    </div>
  )
}

return (
  <div>
    <div>
      find countries: <input value={search} onChange={handleChange} />
    </div>
    <div>
    <Countries country={countriesShown} showInfo={showInfo}/>
    <CountryInfo country={shown}/>
    </div>
  </div>
)

}

export default App