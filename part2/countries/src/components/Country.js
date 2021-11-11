import React from 'react'  

  const Country = ({country, weather}) => {

    return (
      <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <p>
          languages
        </p>
          <ul>
          {country.languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)}
          </ul>
        <img width="200" src={country.flags.png} alt='flag' />        
      </div>
    )

  }
  
export default Country