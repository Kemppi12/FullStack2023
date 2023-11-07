const PersonForm = ({
  newName,
  newNumber,
  handleAddName,
  handleAddNumber,
  handleSubmit,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" value={newName || ''} onChange={handleAddName} />
        </div>
        <div>
          number: <input type="text" value={newNumber || ''} onChange={handleAddNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;