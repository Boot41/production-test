import React, { useState } from 'react';

const ApplicationStatusUpdater = () => {
  const [status, setStatus] = useState('Under Review');
  const [message, setMessage] = useState('');
  
  const statuses = ['Under Review', 'Interview Scheduled', 'Rejected', 'Offer Extended'];

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    updateStatus(e.target.value);
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch('/api/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setMessage(`Status updated to ${newStatus}`);
      } else {
        setMessage('Failed to update status');
      }
    } catch (error) {
      setMessage('Error updating status');
    }
  };

  return (
    <div className="p-4 md:p-6 flex flex-col gap-4" role="region" aria-labelledby="status-updater">
      <h2 id="status-updater">Application Status Updater</h2>
      <select 
        value={status} 
        onChange={handleStatusChange} 
        className="rounded-md h-10 p-2 focus:ring focus:ring-blue-500 transition duration-200 hover:bg-gray-100"
        aria-label="Select application status"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <div className="flex flex-col md:flex-row gap-2">
        {statuses.map((s) => (
          <button 
            key={s} 
            onClick={() => updateStatus(s)} 
            className="min-w-[120px] rounded-md font-bold transition duration-200 bg-blue-500 text-white hover:bg-blue-600"
            aria-label={`Update status to ${s}`}
          >
            {s}
          </button>
        ))}
      </div>
      {message && <div className="mt-4 text-green-600">{message}</div>}
    </div>
  );
};

export default ApplicationStatusUpdater;