import React, { useState } from 'react';

const JobSearchFilter = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [postedDate, setPostedDate] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs?jobTitle=${jobTitle}&location=${location}&jobType=${jobType}&postedDate=${postedDate}`);
      const data = await response.json();
      console.log(data);
      // Here you would typically set state for job listings from response
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
      resetFilters();
    }
  };

  const resetFilters = () => {
    setJobTitle('');
    setLocation('');
    setJobType('');
    setPostedDate('');
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', gap: '10px' }}>
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        aria-label="Job Title"
        style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        aria-label="Location"
        style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        aria-label="Job Type"
        style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="">Job Type</option>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="contract">Contract</option>
      </select>
      <input
        type="date"
        value={postedDate}
        onChange={(e) => setPostedDate(e.target.value)}
        aria-label="Posted Date"
        style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          padding: '10px 20px',
          borderRadius: '20px',
          fontWeight: 'bold',
          backgroundColor: '#007bff',
          color: '#fff',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default JobSearchFilter;