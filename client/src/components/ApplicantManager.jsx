import React, { useState, useEffect } from 'react';

const ApplicantManager = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusToUpdate, setStatusToUpdate] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    fetch(`/api/jobs/${jobId}/applications`)
      .then(response => response.json())
      .then(data => setApplicants(data));
  }, [jobId]);

  const handleView = (applicant) => {
    setSelectedApplicant(applicant);
    setShowDetails(true);
  };

  const handleUpdateStatus = (applicantId) => {
    // Implement status update logic
  };

  const handleScheduleInterview = (applicantId) => {
    // Implement scheduling logic
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(applicants.length / itemsPerPage);
  const displayedApplicants = applicants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ backgroundColor: '#F5F5F5', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Applicant Manager</h1>
        <div>
          <button aria-label="Export" style={{ marginRight: '8px', transition: 'background-color 0.3s' }}>Export</button>
          <button aria-label="Print" style={{ transition: 'background-color 0.3s' }}>Print</button>
        </div>
      </header>
      <table style={{ width: '100%', marginTop: '16px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#F5F5F5', fontWeight: 'bold' }}>
            <th style={{ padding: '16px' }}>Name</th>
            <th style={{ padding: '16px' }}>Status</th>
            <th style={{ padding: '16px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedApplicants.map((applicant, index) => (
            <tr 
              key={applicant.id} 
              style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9', transition: 'background-color 0.3s' }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eaeaea'} 
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9'}
            >
              <td style={{ padding: '16px' }}>{applicant.name}</td>
              <td style={{ padding: '16px' }}>{applicant.status}</td>
              <td style={{ padding: '16px' }}>
                <button aria-label={`View details for ${applicant.name}`} onClick={() => handleView(applicant)}>View Details</button>
                <button aria-label={`Update status for ${applicant.name}`} onClick={() => handleUpdateStatus(applicant.id)}>Update Status</button>
                <button aria-label={`Schedule interview for ${applicant.name}`} onClick={() => handleScheduleInterview(applicant.id)}>Schedule Interview</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '16px' }}>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button key={idx} onClick={() => setCurrentPage(idx + 1)} style={{ margin: '0 4px' }}>
            {idx + 1}
          </button>
        ))}
      </div>
      {showDetails && (
        <div role="dialog" aria-labelledby="applicant-details-title" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#ffffff', padding: '16px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 id="applicant-details-title">{selectedApplicant.name}</h2>
          {/* Display more details... */}
          <button onClick={() => setShowDetails(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ApplicantManager;