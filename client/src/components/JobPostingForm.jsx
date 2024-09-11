import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    job_title: '',
    description: '',
    requirements: '',
    location: '',
    job_type: '',
    application_deadline: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear individual error message
  };

  const validate = () => {
    const validationErrors = {};
    for (const key in formData) {
      if (!formData[key]) {
        validationErrors[key] = 'This field is required';
      }
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('/api/jobs', formData);
      setSuccessMessage('Job posted successfully!');
      setTimeout(() => {
        history.push('/dashboard');
      }, 2000); // Navigate after 2 seconds
    } catch (error) {
      setErrors({ api: 'Error posting job, please try again' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '600px', margin: 'auto', background: '#f9f9f9', borderRadius: '8px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="job_title" aria-label="Job Title">Job Title:</label>
        <input
          type="text"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#fff' }}
        />
        {errors.job_title && <span style={{ color: 'red' }}>{errors.job_title}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="description" aria-label="Description">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#fff' }}
        />
        {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="requirements" aria-label="Requirements">Requirements:</label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#fff' }}
        />
        {errors.requirements && <span style={{ color: 'red' }}>{errors.requirements}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="location" aria-label="Location">Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#fff' }}
        />
        {errors.location && <span style={{ color: 'red' }}>{errors.location}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="job_type" aria-label="Job Type">Job Type:</label>
        <select
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#fff' }}
        >
          <option value="">Select...</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
        </select>
        {errors.job_type && <span style={{ color: 'red' }}>{errors.job_type}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="application_deadline" aria-label="Application Deadline">Application Deadline:</label>
        <input
          type="date"
          name="application_deadline"
          value={formData.application_deadline}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#fff' }}
        />
        {errors.application_deadline && <span style={{ color: 'red' }}>{errors.application_deadline}</span>}
      </div>

      <button
        type="submit"
        style={{
          width: '80%', maxWidth: '300px', padding: '10px', borderRadius: '5px', background: '#007bff', color: '#fff', fontWeight: 'bold', border: 'none',
        }}
        aria-label="Submit Job Posting"
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
      >
        Post Job
      </button>
      {successMessage && <div style={{ color: 'green', marginTop: '15px' }}>{successMessage}</div>}
      {errors.api && <div style={{ color: 'red', marginTop: '15px' }}>{errors.api}</div>}
    </form>
  );
};

export default JobPostingForm;