import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({ person }) => {
  return <li>{person.name} {person.number}</li>
}

const Filter = ({ handleSearch }) => {
  return <input onChange={handleSearch}/>
}

const PersonForm = ({onSubmit, name, handleNameChange, number, handleNumberChange }) => {
  return <form onSubmit={onSubmit}>
  <div>
  <div>name: <input value={name} onChange={handleNameChange}/></div>
  <div>number: <input value={number} onChange={handleNumberChange}/></div>
    <button type="submit">add</button>
  </div>
</form>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

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

  const personsToShow = search
    ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons

  const handleSearch = (event) => {
    setSearch(event.target.value)  
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
      <div>
        search: <Filter search={search} handleSearch={handleSearch}/>
      </div>
      <div> <PersonForm
        name = {newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
        onSubmit={addNameNumber}/>
      </div>   
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Persons key={person.name} person={person} />
        ))}
      </ul>
    </div>
  )

  }


export default App