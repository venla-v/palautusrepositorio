import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'

const Image = ( {url} ) => {
  return (
    <img src={url}/>
  )
}

const Countries = ({ country }) => {
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

    const countryLanguages = Object.values(country[0].languages)
    
    console.log(countryLanguages)

    return (
      <div>

      <h2>
        {country[0].name.common}
      </h2>
      <div>
        Capital {country[0].capital}
      </div>
      <div>
        Area {country[0].area}
      </div>
      <h2>
        Languages
      </h2>
      <div>
      {countryLanguages.map((language) => (
           <div key={language}>{language}</div>
        ))}
      </div>
      <div>
        <Image url={country[0].flags.png}/>
      </div>

      </div>
      
    )
  }

  return ( 
      <div> {country.map(c => (
        <div key={c.name.common}>{c.name.common}</div>
      ))}</div>
  )
}


const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])


  useEffect(() => {
      countryService.getAll()
      .then(response => {setCountries(response)})
      
  }, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const countriesShown = search
   ? countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
   : countries

  return (
    <div>
      <div>
        find countries: <input value={search} onChange={handleChange} />
      </div>
      <div>
      <Countries country={countriesShown}/>
      </div>
    </div>
  )
}

export default App