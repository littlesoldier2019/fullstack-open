import React from "react";

const Filter = ({ filteredName, handleFilter }) => {
  return (
    <div>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={filteredName}
          onChange={handleFilter}
        />
      </form>
    </div>
  );
};

export default Filter;
