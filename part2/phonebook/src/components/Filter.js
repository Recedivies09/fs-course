import React from "react";

const Filter = ({ filter }) => {
  return (
    <p>
      filter shown with
      <input onChange={filter} />
    </p>
  );
};

export default Filter;
