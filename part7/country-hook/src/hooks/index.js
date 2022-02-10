import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

    useEffect(() => {
        axios
            .get(`https://restcountries.com/v2/name/${name}?fullText=true`)
            .then(res => {
                if (res.data.status === 404) {
                    setCountry({found:false})
                } else {
                    setCountry({
                        found: true,
                        data: res.data[0]
                    })
                }
                console.log(res)
            })
            .catch(error => console.log(error.message))
  }, [name])

  return country
}