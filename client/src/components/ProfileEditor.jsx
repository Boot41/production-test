import React, { useState } from 'react';

const ProfileEditor = ({ seekerId }) => {
  const [formData, setFormData] = useState({
    personalInfo: { name: '', email: '' },
    workHistory: [],
    education: [],
    skills: [],
    additionalDetails: '',
  });
  const [message, setMessage] = useState('');

  const saveProfileHandler = async () => {
    const url = seekerId ? `/api/job-seekers/${seekerId}` : '/api/job-seekers';
    const method = seekerId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to save profile');
      setMessage('Profile saved successfully!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={{ padding: '20px' }}>
      {message && <div role="alert" style={{ color: '#340487' }}>{message}</div>}
      <form>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Personal Information</h2>
          <label>
            Name:
            <input type="text" name="personalInfo.name" onChange={handleChange} style={{ width: '100%' }} aria-label="Name" />
          </label>
          <label>
            Email:
            <input type="email" name="personalInfo.email" onChange={handleChange} style={{ width: '100%' }} aria-label="Email" />
          </label>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Work History</h2>
          {/* Additional fields for Work History */}
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Education</h2>
          {/* Additional fields for Education */}
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Skills</h2>
          {/* Additional fields for Skills */}
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Additional Details</h2>
          <textarea name="additionalDetails" onChange={handleChange} style={{ width: '100%' }} aria-label="Additional Details"></textarea>
        </div>

        <button type="button" onClick={saveProfileHandler} style={{
          backgroundColor: '#340487',
          color: '#fff',
          borderRadius: '5px',
          padding: '10px 20px',
          fontWeight: 'bold',
        }}>
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileEditor;