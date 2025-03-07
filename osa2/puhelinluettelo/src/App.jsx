import { useState } from 'react'

const Persons = ({ person }) => {
  return <li>{person.name} {person.number}</li>
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number: '123 456 7890'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addNameNumber = (event) => {
    console.log(newName)
    console.log(persons)
    event.preventDefault()

    const found = persons.find((element) => element.name === newName)

    console.log(found)
    
    if (found) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameNumber = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameNumber))
      setNewName('')
      setNewNumber('')
    }

   
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNameNumber}>
        <div>
        <div>name: <input alue={newName} onChange={handleNameChange}/></div>
        <div>number: <input alue={newNumber} onChange={handleNumberChange}/></div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Persons key={person.name} person={person} />
        ))}
      </ul>
    </div>
  )

}

export default App