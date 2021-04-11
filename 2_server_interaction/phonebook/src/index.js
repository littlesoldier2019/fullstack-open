import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import * as dataServices from "./services/dataServices";

const messageStyle = {
  color: "green",
  fontStyle: "italic",
  fontSize: 16,
  border: "green 2px solid",
  padding: "20px",
};

const errorStyle = {
  color: "red",
  fontStyle: "italic",
  fontSize: 16,
  border: "green 2px solid",
  padding: "20px",
};

const App = () => {
  const defaultValue = { name: "", number: "" };
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState(defaultValue);
  const [filteredName, setFilteredName] = useState("");
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    dataServices.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const addPerson = (person) => {
    dataServices.create(person).then((person) => {
      setPersons([...persons, person]);
    });
    setMessage(`${person.name} is successfully added`);
    setNewPerson(defaultValue);
  };

  const deletePerson = (id) => {
    const isConfirm = window.confirm("Do you want to delete?");
    const canDelete = persons?.find((item) => item.id === id);
    if (canDelete.length !== 0 && isConfirm) {
      dataServices.deleteItem(id);
      const remainPerson = persons?.filter((item) => item.id !== id);
      setNewPerson(remainPerson);
    } else {
      setError("Can not be deleted");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isAddable = persons?.find((person) => person.name === newPerson.name);
    const isEmpty =
      newPerson?.name?.length === 0 && newPerson?.number?.length === 0;

    if (isEmpty) {
      alert("No valid input");
    }
    if (isAddable?.length === 1) {
      const isConfirm = window.confirm(
        `${newPerson.name} is already in the phonebook, replace the old number with a new one?`
      );
      isConfirm && console.log("want to replace");
    } else {
      addPerson(newPerson);
    }
  };

  const handleInput = (event) => {
    setNewPerson({ ...newPerson, [event.target.name]: event.target.value });
  };

  const handleFilter = (event) => {
    setFilteredName(event.target.value);
    const filteredPerson = persons?.filter((person) => {
      return person.name
        .toLocaleLowerCase()
        .includes(filteredName?.toLocaleLowerCase());
    });
    filteredName.length > 0 ? setPersons(filteredPerson) : setPersons(persons);
  };

  return (
    <div>
      {!!message && <h3 style={messageStyle}>{message}</h3>}
      {!!error && <h3 style={errorStyle}>{error}</h3>}
      <h2>Phonebook</h2>
      <Filter filteredName={filteredName} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        newPerson={newPerson}
        handleSubmit={handleSubmit}
        handleInput={handleInput}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
