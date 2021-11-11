import React from 'react'

const PersonForm = ({handleSubmit, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input
          onChange={handleNameChange}
          value={newName}
        />
      </div>
      <div>
        number: <input
          onChange={handleNumberChange}
          value={newNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


export default PersonForm