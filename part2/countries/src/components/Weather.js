import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: capital,
    };
    axios
      .get(`http://api.weatherstack.com/current`, { params })
      .then((response) => {
        const apiResponse = response.data; // (apiResponse.location.name) (apiResponse.current.temperature) (apiResponse.current.weather_icons) (apiResponse.current.wind_speed) (apiResponse.current.wind_dir)
        setWeather(apiResponse);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      {Object.keys(weather).length === 0 ? (
        <div>No Weather.</div>
      ) : (
        <div>
          {console.log(weather)}
          <h3>Weather in {weather.location.name}</h3>
          <h4>temperature: </h4>
          <span>{weather.current.temperature} Celcius</span>
          <img src={weather.current.icons} alt="Icons" />
          <h4>wind: </h4>
          <span>
            {weather.current.wind_speed} mph direction{" "}
            {weather.current.wind_dir}
          </span>
        </div>
      )}
    </div>
  );
};

export default Weather;
