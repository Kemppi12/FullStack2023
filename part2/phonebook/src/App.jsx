import { useEffect, useState } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import SearchFilter from './components/SearchFilter';
import personService from './services/persons';
import Notification from './components/Notification';
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchItem, setSearchItem] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)       
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleAddName = (e) => {
    setNewName (e.target.value)
  }

  const handleAddNumber =(e) => {
    setNewNumber (e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newPerson = {
      name: newName,
      number: newNumber,
    };
  
    const existingPerson = persons.find((person) => person.name === newName);
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );
  
      if (confirmUpdate) {
        setErrorMessage(` Updated phone number for ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        personService
          .update(existingPerson.id, updatedPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons([...persons, createdPerson]);
          setNewName("");
          setNewNumber("");
          setErrorMessage(` Added ${newPerson.name} to the phonebook`)
          setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDelete = (id) => {
      personService.deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }
  
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    if(searchTerm) {
      const filteredPersons = persons.filter((person) => 
      person.name.includes(searchTerm)
    );
    setFilteredPersons(filteredPersons);
    } else {
      setFilteredPersons([]);
    }    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <SearchFilter
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        persons={persons}
        setFilteredPersons={setFilteredPersons}
        handleSubmit={handleSearchChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleAddName={handleAddName}
        handleAddNumber={handleAddNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={searchItem ? filteredPersons : persons }
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App