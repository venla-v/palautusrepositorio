const Persons = ({ person, deletePerson }) => {
    return (<>
    <li>{person.name} {person.number}
    <button onClick={() => deletePerson(person.id, person)}>del</button>
          </li>
        </>
    )
    
  }

  export default Persons