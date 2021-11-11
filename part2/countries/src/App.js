import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AlertMsg from './components/AlertMsg'
import DisplayResults from './components/DisplayResults'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])
  
  const filterCountries = (event) => {
    setFilteredCountries(countries.filter(country => country.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 ))
  }

  const showCountry = (country) => {
    setFilteredCountries([country])
  }

  return (
    <div>
      <p>find countries <input onChange={filterCountries} /></p>
      {
        filteredCountries.length > 10 ?
          <AlertMsg text='Too many matches, specify another filter' /> :
          <DisplayResults filteredCountries={filteredCountries} showCountry={showCountry}/>
      }
    </div>
  )
}

export default App

