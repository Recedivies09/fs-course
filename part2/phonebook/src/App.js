import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import API from "./services/API";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    API.getAllPerson().then((initialPhoneBook) => {
      setFilter(initialPhoneBook);
      setPersons(initialPhoneBook);
    });
  }, []);

  const handleOnClick = () => {
    let ok = 1;
    persons.forEach((person) => {
      if (person.name === newName) {
        ok = 0;
        const result = window.confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`
        );
        if (result) {
          const samePerson = {
            name: person.name,
            number: newNumber,
          };
          API.updatePerson(samePerson, person.id)
            .then((updatedPerson) => {
              setSuccessMessage(
                `${person.name} old number changed from ${person.number} to ${newNumber}`
              );
              setTimeout(() => {
                setSuccessMessage(null);
              }, 5000);
              setPersons(
                persons.map((updatePerson) =>
                  updatePerson.id !== person.id.id
                    ? updatePerson
                    : updatedPerson
                )
              );
            })
            .catch((error) => {
              setErrorMessage(`${error.response.data.error}`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            });
        }
      }
    });
    if (ok) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      API.createPerson(newPerson)
        .then((person) => {
          setSuccessMessage(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
          setPersons([...persons, person]);
        })
        .catch((error) => {
          setErrorMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value) {
      const newPersons = persons.filter((person) => {
        return person.name.toLowerCase().includes(value.toLowerCase());
      });
      setFilter(newPersons);
    } else {
      setFilter(persons);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />

      <Filter filter={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm
        handleOnSubmit={handleOnSubmit}
        handleOnClick={handleOnClick}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons filter={filter} />
    </div>
  );
};

export default App;
