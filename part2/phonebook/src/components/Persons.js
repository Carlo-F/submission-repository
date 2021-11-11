import React from 'react'
import Person from './Person'

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <ul>
      {filteredPersons.map((person) => <Person key={person.name} person={person} handleDelete={handleDelete}/>)}
    </ul>
  )
}


export default Persons