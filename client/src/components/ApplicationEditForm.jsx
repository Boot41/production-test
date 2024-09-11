import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const ApplicationEditForm = () => {
  const { application_id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({ resume: '', coverLetter: '', additionalDetails: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      const response = await fetch(`/api/applications/${application_id}`);
      const data = await response.json();
      setFormData(data);
    };
    fetchApplicationDetails();
  }, [application_id]);

  const updateApplicationHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`/api/applications/${application_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setIsLoading(false);
    // Optional: Display notification upon success
    // Navigate back to application tracking
    history.push('/application-tracking');
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    history.push('/application-tracking');
  };

  return (
    <form 
      onSubmit={updateApplicationHandler} 
      style={{ padding: '20px', backgroundColor: '#f8f8f8', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '5px' }}
    >
      <h2 style={{ fontSize: '20px' }}>Edit Application</h2>
      <div>
        <label htmlFor="resume" aria-label="Resume">
          Resume
        </label>
        <input
          type="text"
          id="resume"
          name="resume"
          value={formData.resume}
          onChange={handleChange}
          style={{ padding: '10px', borderRadius: '5px', width: '100%' }}
          required
        />
      </div>
      <div>
        <label htmlFor="coverLetter" aria-label="Cover Letter">
          Cover Letter
        </label>
        <input
          type="text"
          id="coverLetter"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          style={{ padding: '10px', borderRadius: '5px', width: '100%' }}
          required
        />
      </div>
      <div>
        <label htmlFor="additionalDetails" aria-label="Additional Details">
          Additional Details
        </label>
        <input
          type="text"
          id="additionalDetails"
          name="additionalDetails"
          value={formData.additionalDetails}
          onChange={handleChange}
          style={{ padding: '10px', borderRadius: '5px', width: '100%' }}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <button
          type="submit"
          style={{
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            padding: '10px 15px',
            backgroundColor: '#f8f8f8',
            color: '#333',
            marginLeft: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ApplicationEditForm;