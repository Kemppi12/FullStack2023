import { useState } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import SearchFilter from './components/SearchFilter';


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('')
  const [searchItem, setSearchItem] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleAddName = (e) => {
    setNewName (e.target.value)
  }

  const handleAddNumber =(e) => {
    setNewNumber (e.target.value)
  }

  const handleSubmit = (e)=> {
    e.preventDefault();

    const nameExists = persons.some((person) => person.name === newName); 

    if(nameExists){
      alert(`${newName} is already added to phonebook!`);
    } else {
      setPersons([...persons, {name:newName , number:newNumber}]);
      setNewName('');
      setNewNumber('');
    } 
  }

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredPersons = persons.filter((person) => 
      person.name.includes(searchTerm)
    );

    setFilteredPersons(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={searchItem ? filteredPersons : persons } />
    </div>
  )
}

export default App