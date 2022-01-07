import React from "react";
import Weather from "./Weather";

const FilterDetail = ({ filter }) => {
  console.lo(filter);
  return (
    <div>
      <div>
        <h1>{filter.name}</h1>
        <p>capital {filter.capital}</p>
        <p>population {filter.population}</p>
        <h3>languages</h3>
        <ul>
          {filter.languages.map((language, id) => {
            return <li key={id}>{language.name}</li>;
          })}
        </ul>
        <img src={filter.flag} alt="flag" />
        <Weather />
      </div>
    </div>
  );
};

export default FilterDetail;
