import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (baseUrl) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        if (!response.data.status) setCountry(response.data);
      })
      .catch((err) => console.log(err));
  }, [baseUrl]);

  if (country) {
    country[0].found = true;
    return country[0];
  }
  return { country, found: false };
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flags[0]}
        height="100"
        alt={`flag of ${country.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("");
  const [name, setName] = useState("");
  const country = useCountry(
    `https://restcountries.com/v2/name/${name}?fullText=true`
  );

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
