import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'
import Persons from './components/Persons'


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
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(all => {
      setPersons(all)
      console.log(persons)
    })
  }, )

  useEffect(() => {
    console.log(persons)
  }, [persons])

  const addNameNumber = (event) => {
    console.log(newName)
    console.log(persons)
    event.preventDefault()

    const found = persons.find((element) => element.name === newName)

    console.log(found)
    
    if (found) {
      if (window.confirm(`${newName} is already added to phonebook. Want to replace the number?`)) {
        
        personService.update(found.id, { name: found.name, number: newNumber })
        .then((updatedPerson) => {
            console.log(updatedPerson)
            
            const updatedPersons = persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            );
            setPersons(updatedPersons)
            
            setNewName('')
            setNewNumber('')
            
            setMessage(`${newName} number replaced`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error)
            setErrorMessage(
              `Person '${newName}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
    else {
      const nameNumber = {
        name: newName,
        number: newNumber
      }

      personService.create(nameNumber)
      .then((returnedNameNumber) => {
        setPersons(persons.concat(returnedNameNumber))
        setNewName('')
        setNewNumber('')
      
        setMessage(`${returnedNameNumber.name} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log('errorkoodi:', error) 
        console.log('Error responsen data:', error.response.data) 
        console.log('error message:', error.response.data.error)

        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        console.error('Error adding person:', error)
      })
  }}

    

  const deletePerson = (id, person) => {
    console.log(id.name)

  if (window.confirm(`Are you sure you want to delete ${person.name}?`)){

   personService.del(id).then(() => {
    setPersons(persons.filter(person => person.id !== id))
    console.log(`Deleted person ID ${id}`);

    setMessage(`${person.name} deleted`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  })
  .catch(error => {
    console.log(error.response.data)
    setErrorMessage(`${JSON.stringify(error.response.data)}`)
    setTimeout(() => {
      setErrorMessage(null)              
    }, 5000)
  })
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
      <Notification message={message} />
      <Error message={errorMessage} />
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
      {personsToShow.map(person => (
        
        <Persons key={person.id} person={person} deletePerson={deletePerson} />
      ))}
      </ul>
    </div>
  )

  }


export default App