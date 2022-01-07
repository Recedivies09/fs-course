import React from "react";

const PersonForm = ({
  handleOnSubmit,
  handleOnClick,
  handleNewName,
  handleNewNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        Name: <input onChange={handleNewName} value={newName} />
      </div>
      <div>
        Number: <input onChange={handleNewNumber} value={newNumber} />
      </div>
      <button type="submit" onClick={handleOnClick}>
        Add
      </button>
    </form>
  );
};

export default PersonForm;
