import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons ] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number:newNumber}

        personService
          .update(changedPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id === changedPerson.id ? changedPerson : person))
            setFilteredPersons(filteredPersons.map(person => person.id === changedPerson.id ? changedPerson : person))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(
              `phone number replaced`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `${error.response.data.error}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setFilteredPersons(filteredPersons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(
            `added ${newName}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `${error.response.data.error}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
    }

  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .cancel(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setFilteredPersons(filteredPersons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(
            `Person already deleted from server`
          )
        })
    }
  }

  const filterPersons = (event) => {
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 ))
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification status={'success'} message={successMessage} />
      <Notification status={'error'} message={errorMessage} />
      <Filter handleChange={filterPersons} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
