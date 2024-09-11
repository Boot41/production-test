import React, { useState } from 'react';

const JobApplicationForm = ({ jobId }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !coverLetter || !additionalDetails) {
      setErrorMessage('All fields are required.');
      return;
    }
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);
    formData.append('additionalDetails', additionalDetails);

    try {
      await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        body: formData,
      });
      // Handle successful submission (e.g., show notification)
    } catch (error) {
      // Handle error
      console.error('Submission error:', error);
    }
  };

  const handleReset = () => {
    setResume(null);
    setCoverLetter('');
    setAdditionalDetails('');
    setErrorMessage('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div style={{ marginBottom: '15px' }}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          aria-label="Upload your resume"
          onChange={(e) => setResume(e.target.files[0])}
          style={{ padding: '10px', width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <textarea
          rows="4"
          placeholder="Cover Letter"
          aria-label="Cover letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          style={{ padding: '10px', width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Additional Details"
          aria-label="Additional details"
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          style={{ padding: '10px', width: '100%' }}
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button
          type="submit"
          disabled={!resume || !coverLetter || !additionalDetails}
          style={{
            backgroundColor: '#1e1236',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            width: '48%',
            padding: '20px',
          }}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          style={{
            backgroundColor: 'white',
            color: '#1e1236',
            border: '1px solid #D1D5DB',
            borderRadius: '8px',
            width: '48%',
            padding: '20px',
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JobApplicationForm;