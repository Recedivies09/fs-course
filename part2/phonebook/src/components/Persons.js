import React from "react";
import API from "../services/API";

const Persons = ({ filter }) => {
  const handleDelete = (person) => {
    const result = window.confirm(`Delete ${person.name} ?`);
    if (result) {
      API.deletePerson(person.id);
    }
  };

  return (
    <ul>
      {filter.map((person) => {
        return (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => handleDelete(person)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
