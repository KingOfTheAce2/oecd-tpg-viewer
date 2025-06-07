function NACECodeFinder() {
  const { useState, useEffect } = React;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [secondaryQuery, setSecondaryQuery] = useState('');
  const [secondaryField, setSecondaryField] = useState('all');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = (retry = 3) => {
    const url = 'assets/nace_data.json';
    fetch(url)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch((err) => {
        if (retry > 0) {
          setTimeout(() => loadData(retry - 1), 2000);
        } else {
          setError('Error: ' + err.message);
          setLoading(false);
        }
      });
  };

  useEffect(() => { loadData(); }, []);

  const handleSearch = () => {
    const filtered = data.filter((item) => {
      const primaryMatch = searchField === 'all' || (item[searchField] && item[searchField].toString().toLowerCase().includes(searchQuery.toLowerCase()));
      const secondaryMatch = secondaryField === 'all' || (item[secondaryField] && item[secondaryField].toString().toLowerCase().includes(secondaryQuery.toLowerCase()));
      return primaryMatch && secondaryMatch;
    });
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSecondaryQuery('');
    setSearchField('all');
    setSecondaryField('all');
    setFilteredData([]);
  };

  if (loading) return React.createElement('div', { style: { padding: '20px', textAlign: 'center' } }, 'Loading data...');
  if (error) return React.createElement('div', { style: { padding: '20px', textAlign: 'center' } }, error);

  return (
    React.createElement('div', { style: { padding: '20px', maxWidth: '600px', margin: '0 auto' } },
      React.createElement('h1', { style: { fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' } }, 'NACE Code Finder'),
      React.createElement('div', { style: { marginBottom: '16px' } },
        React.createElement('h3', null, 'Primary Search'),
        React.createElement('input', { type: 'text', placeholder: 'Primary Search...', value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), style: { width: '100%', padding: '10px', marginBottom: '8px' } }),
        React.createElement('select', { value: searchField, onChange: (e) => setSearchField(e.target.value), style: { width: '100%', padding: '10px' } },
          React.createElement('option', { value: 'all' }, 'All Fields'),
          React.createElement('option', { value: 'CODE' }, 'Code'),
          React.createElement('option', { value: 'NAME' }, 'Name'),
          React.createElement('option', { value: 'Includes' }, 'Includes'),
          React.createElement('option', { value: 'IncludesAlso' }, 'Includes Also'),
          React.createElement('option', { value: 'Excludes' }, 'Excludes')
        )
      ),
      React.createElement('div', { style: { marginBottom: '16px' } },
        React.createElement('h3', null, 'Secondary Search (Optional)'),
        React.createElement('input', { type: 'text', placeholder: 'Secondary Search...', value: secondaryQuery, onChange: (e) => setSecondaryQuery(e.target.value), style: { width: '100%', padding: '10px', marginBottom: '8px' } }),
        React.createElement('select', { value: secondaryField, onChange: (e) => setSecondaryField(e.target.value), style: { width: '100%', padding: '10px' } },
          React.createElement('option', { value: 'all' }, 'All Fields'),
          React.createElement('option', { value: 'CODE' }, 'Code'),
          React.createElement('option', { value: 'NAME' }, 'Name'),
          React.createElement('option', { value: 'Includes' }, 'Includes'),
          React.createElement('option', { value: 'IncludesAlso' }, 'Includes Also'),
          React.createElement('option', { value: 'Excludes' }, 'Excludes')
        )
      ),
      React.createElement('div', { style: { textAlign: 'center', marginBottom: '16px' } },
        React.createElement('button', { onClick: handleSearch, style: { padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' } }, 'Search'),
        React.createElement('button', { onClick: handleReset, style: { padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', marginLeft: '8px', cursor: 'pointer' } }, 'Reset')
      ),
      filteredData.length > 0 ? (
        filteredData.map((item, idx) => (
          React.createElement('div', { key: idx, style: { marginBottom: '12px', padding: '12px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '4px' } },
            React.createElement('p', null, React.createElement('strong', null, 'Code:'), ' ', item.CODE.toString()),
            React.createElement('p', null, React.createElement('strong', null, 'Name:'), ' ', item.NAME),
            React.createElement('p', null, React.createElement('strong', null, 'Includes:'), ' ', item.Includes),
            item.IncludesAlso ? React.createElement('p', null, React.createElement('strong', null, 'Includes Also:'), ' ', item.IncludesAlso) : null,
            item.Excludes ? React.createElement('p', null, React.createElement('strong', null, 'Excludes:'), ' ', item.Excludes) : null
          )
        ))
      ) : React.createElement('p', { style: { textAlign: 'center' } }, 'No results found.')
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(NACECodeFinder));
