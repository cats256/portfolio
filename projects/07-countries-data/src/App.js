import { useState, useEffect } from 'react';
import getCountries from './services/countries';
import SearchForm from './components/SearchForm';
import Countries from './components/Countries';
import './App.css';

function App() {
  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '32px',
  };

  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    getCountries().then((countriesReceived) => setCountries(countriesReceived));
  }, []);

  useEffect(() => {
    const filteredCountries = countries.filter((country) => (
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    ));
    setCountriesToShow(filteredCountries);
  }, [countries, filter]);

  return (
    <div style={appStyle}>
      <SearchForm filter={filter} setFilter={setFilter} />
      <Countries
        filter={filter}
        countriesToShow={countriesToShow}
        setCountriesToShow={setCountriesToShow}
      />
    </div>
  );
}

export default App;
