import React from "react";
import FilterDetail from "./FilterDetail";

const Filters = ({ filters }) => {
  const render = (filter) => {
    return (
      <div>
        <FilterDetail filter={filter} />;
      </div>
    );
  };
  return (
    <div>
      {filters.map((filter, id) => {
        return (
          <div key={id}>
            <p>
              {filter.name}
              <button onClick={() => render(filter)}>Show</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
