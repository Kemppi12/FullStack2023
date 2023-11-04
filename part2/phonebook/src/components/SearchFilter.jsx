const SearchFilter = ({ searchItem, setSearchItem , persons, setFilteredPersons}) => {
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
      <h3>Filter shown with</h3>
      <input
        type="text"
        value={searchItem}
        onChange={handleSearchChange}
        placeholder="Type to search"
      />
    </div>
  );
};

export default SearchFilter;