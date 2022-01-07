import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterDetail from "./components/FilterDetail";
import Filters from "./components/Filters";
import Weather from "./components/Weather";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState([]);
  const [str, setStr] = useState("");

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFind = (e) => {
    const value = e.target.value;
    let ret = countries.filter((country) => {
      return country.name.toLowerCase().includes(value.toLowerCase());
    });
    const len = ret.length;
    if (len > 10) {
      setStr(["Too many matches, specify another field."]);
    } else if (len > 1) {
      setStr("");
      setFilter(ret);
    } else if (len === 1) {
      setStr("");
      setFilter(ret);
    } else {
      setStr(["No countries."]);
    }
  };
  return (
    <div>
      <p>
        find countries
        <input type="text" onChange={handleFind} />
      </p>
      {str.length === 1 ? (
        str
      ) : filter.length === 1 ? (
        <div>
          <FilterDetail filter={filter[0]} />
          <Weather capital={filter[0].capital} />
        </div>
      ) : (
        <Filters filters={filter} />
      )}
    </div>
  );
};

export default App;

