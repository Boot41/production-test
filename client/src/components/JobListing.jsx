import React, { useState, useEffect } from 'react';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ jobType: '', location: '' });
  
  // Fetch job listings from API
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);
  
  // Handle job application
  const handleApply = async (jobId) => {
    await fetch(`/api/apply/${jobId}`, { method: 'POST' });
    alert('Application submitted!'); // Could use a notification library for better UX
  };

  // Filter jobs based on user selection
  const filteredJobs = jobs.filter(job => {
    return (
      (filters.jobType ? job.type === filters.jobType : true) &&
      (filters.location ? job.location === filters.location : true)
    );
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Job Listings</h2>
      <div>
        <label aria-label="Job Type Filter">
          Job Type:
          <select onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}>
            <option value="">All</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
          </select>
        </label>
        <label aria-label="Location Filter">
          Location:
          <input
            type="text"
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            placeholder="Location"
          />
        </label>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '15px',
        marginTop: '20px'
      }}>
        {filteredJobs.map(job => (
          <div key={job.id} style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            margin: '15px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{job.title}</h3>
            <p style={{ fontSize: '16px' }}>{job.company}</p>
            <p style={{ fontSize: '16px' }}>{job.location}</p>
            <button
              onClick={() => handleApply(job.id)}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '10px 15px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
              aria-label={`Apply for ${job.title}`}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListing;