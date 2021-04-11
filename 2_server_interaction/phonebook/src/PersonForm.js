import React from "react";

const PersonForm = ({ newPerson, handleSubmit, handleInput }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newPerson.name}
          onChange={handleInput}
        />
        <br />
        <br />
        <label htmlFor="number">Number:</label>
        <input
          type="text"
          id="number"
          name="number"
          value={newPerson.number}
          onChange={handleInput}
        />
        <br />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default PersonForm;
