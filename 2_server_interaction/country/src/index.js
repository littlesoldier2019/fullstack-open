import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const GetWeatherData = (city) => {
    useEffect(() => {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }, [city]);
    return weather;
  };

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const listCountry = () => {
    const filteredCountries = countries?.filter((country) => {
      return country.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
    const city = filteredCountries[0]?.capital;
    const weatherData = GetWeatherData(city);

    if (filteredCountries.length === 1) {
      const languagesList = filteredCountries[0].languages?.map((language) => {
        return <p>{language?.name}</p>;
      });
      const watherIcons = weatherData?.current?.weather_icons.map(
        (icon, index) => <img src={icon} alt="weather icon" key={index} />
      );
      const weatherList = (
        <div>
          <p>Temperature: {weatherData?.current?.temperature}</p>
          {watherIcons}
          <p>
            Wind: {weatherData?.current?.wind_speed} mph direction{" "}
            {weatherData?.current?.wind_dir}
          </p>
        </div>
      );
      return (
        <div>
          <h1>{filteredCountries[0].name}</h1>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Polulation: {filteredCountries[0].population}</p>
          <h2>Languages</h2>
          {languagesList}
          <img
            class="flag"
            src={filteredCountries[0].flag}
            alt="country flag"
          />
          <h2>Weather in {city || "city"}</h2>
          {weatherList}
        </div>
      );
    }
    if (filteredCountries.length > 1 && filteredCountries.length < 10) {
      return filteredCountries.map((country, index) => (
        <p key={index}>{country.name}</p>
      ));
    }
    if (filteredCountries.length >= 10) {
      return <p>Too many matches, specify another filter</p>;
    }
    return <p>No countries found</p>;
  };

  return (
    <div>
      <form>
        <label htmlFor="country">Find country</label>
        <br />
        <input
          type="text"
          id="country"
          name="country"
          value={searchTerm}
          onChange={handleInput}
        />
      </form>
      <div>{listCountry(countries)}</div>
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
