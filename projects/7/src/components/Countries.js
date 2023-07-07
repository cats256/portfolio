import { useState, useEffect } from 'react';
import getWeather from '../services/weather';

function Countries({ filter, countriesToShow, setCountriesToShow }) {
  const countriesStyle = {
    width: '420px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '4px',
  };

  if (!filter) return null;

  if (countriesToShow.length > 25) {
    return <div style={{ marginTop: '4px' }}>Too many matches, specify another keyword</div>;
  } if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]} />;
  }

  return (
    <div style={countriesStyle}>
      {countriesToShow.map((country) => (
        <div style={buttonContainerStyle}>
          <div key={country.name.common}>{country.name.common}</div>
          <button type="button" onClick={() => setCountriesToShow([country])}>Show</button>
        </div>
      ))}
    </div>
  );
}

function Country({ country }) {
  return (
    <div style={{ width: '420px' }}>
      <p><b>{country.name.common}</b></p>
      <img src={country.flags.svg} width="200" alt={`${country.name.common}'s Flag`} />
      <p><b>Capital(s):</b></p>
      {country.capital.map((capital) => <div key={capital}>{capital}</div>)}
      <p><b>Area (km^2): </b></p>
      <div>{country.area}</div>
      <p><b>Language(s):</b></p>
      {Object.keys(country.languages).map((language) => (
        <div key={language}>{country.languages[language]}</div>
      ))}
      {country.capital.map((capital) => (
        <>
          <p>
            <b>
              Weather in
              {' '}
              {capital}
            </b>
          </p>
          <Weather city={capital} />
        </>
      ))}
    </div>
  );
}

function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => { getWeather(city).then((data) => setWeatherData(data)); }, [city]);

  if (weatherData) {
    return (
      <>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} width="200" alt={`${city}'s weather icon`} />
        <div>
          Wind speed:
          {weatherData.wind.speed}
          {' '}
          m/s
        </div>
        <div>
          Temperature:
          {weatherData.main.temp}
          {' '}
          K
        </div>
        <br />
      </>
    );
  }
}

export default Countries;
