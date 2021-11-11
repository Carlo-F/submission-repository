import React from 'react'
import Country from './Country'

const DisplayResults = ({ filteredCountries, showCountry }) => {

    return (
      <div>
      {
        filteredCountries.length === 1 ?
            <Country country={filteredCountries[0]} /> :
            filteredCountries.map((country) => <p key={country.alpha3Code}>{country.name} <button onClick={() => {showCountry(country)}}>show</button></p>)
      }
      </div>
    )
  }
  
export default DisplayResults