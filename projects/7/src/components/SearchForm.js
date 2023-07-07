function SearchForm({ filter, setFilter }) {
  const searchFormStyle = {
    display: 'flex',
    width: '420px',
    whiteSpace: 'nowrap',
  };

  const inputContainerStyle = {
    flexGrow: '1',
    display: 'flex',
  };

  return (
    <form style={searchFormStyle}>
      <div style={inputContainerStyle}>
        Find countries
        <input style={{ width: '100%', marginLeft: '8px' }} value={filter} onChange={(event) => setFilter(event.target.value)} />
      </div>
    </form>
  );
}

export default SearchForm;
