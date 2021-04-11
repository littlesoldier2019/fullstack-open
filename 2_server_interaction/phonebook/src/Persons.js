import React from "react";

const Person = ({ persons, deletePerson }) => {
  const content =
    (!persons || persons?.length !== 0) ? 
    persons?.map((person, index) => (
      <div key={index}>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
        <button onClick={() => deletePerson(person.id)}>Delete</button>
      </div>
    )) : null;
  return <div>{content}</div>;
};

export default Person;
