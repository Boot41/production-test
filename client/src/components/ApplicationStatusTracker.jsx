import React, { useEffect, useState } from 'react';

const ApplicationStatusTracker = () => {
  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch('/api/job-applications'); // Adjust API endpoint as necessary
      const data = await response.json();
      setApplications(data);
    };
    fetchApplications();
  }, []);

  const handleViewDetails = (id) => {
    // Navigate to the detailed view using the application ID
    window.location.href = `/application-details/${id}`;
  };

  return (
    <div style={{ backgroundColor: '#F5F5F5', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#666666', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Job Application Status
      </h1>
      {applications.map((app) => (
        <div
          key={app.id}
          style={{
            backgroundColor: 'white',
            color: '#666666',
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '5px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
          }}
        >
          <h2 style={{ fontSize: '16px' }}>{app.companyName} - {app.position}</h2>
          <p style={{ fontSize: '16px' }}>Applied on: {new Date(app.applicationDate).toLocaleDateString()}</p>
          <p style={{ fontSize: '16px' }}>Status: {app.status}</p>
          <button
            onClick={() => handleViewDetails(app.id)}
            style={{
              backgroundColor: '#340487',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 15px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            aria-label={`View details for ${app.position} at ${app.companyName}`} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5b1bc2'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#340487'} 
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default ApplicationStatusTracker;