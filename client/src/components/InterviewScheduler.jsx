import React, { useState, useEffect } from 'react';

const InterviewScheduler = ({ applicationId, onClose }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [interviewType, setInterviewType] = useState('phone');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await fetch(`/api/applications/${applicationId}/schedule-interview`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, time, interviewType })
            });
            if (response.ok) {
                alert('Interview scheduled successfully!');
                onClose();
            } else {
                alert('Failed to schedule interview. Please try again.');
            }
        } catch (error) {
            console.error('Error scheduling interview:', error);
        }
    };

    const validateFields = () => {
        const newErrors = {};
        if (!date) newErrors.date = 'Date is required.';
        if (!time) newErrors.time = 'Time is required.';
        if (!interviewType) newErrors.interviewType = 'Interview type is required.';
        return newErrors;
    };

    const handleCancel = () => {
        resetFields();
        onClose();
    };

    const resetFields = () => {
        setDate('');
        setTime('');
        setInterviewType('phone');
        setErrors({});
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleCancel();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000
        }}>
            <form style={{
                backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                padding: '20px', width: '90%', maxWidth: '500px'
            }} onSubmit={handleSubmit}>
                <h2 style={{ margin: '0 0 20px' }}>Schedule Interview</h2>

                <label htmlFor="date" style={{ display: 'block', marginBottom: '8px' }}>
                    Date
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        aria-describedby="date-error"
                        aria-required="true"
                    />
                    {errors.date && <span id="date-error" style={{ color: 'red' }}>{errors.date}</span>}
                </label>

                <label htmlFor="time" style={{ display: 'block', marginBottom: '8px' }}>
                    Time
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        aria-describedby="time-error"
                        aria-required="true"
                    />
                    {errors.time && <span id="time-error" style={{ color: 'red' }}>{errors.time}</span>}
                </label>

                <label htmlFor="interviewType" style={{ display: 'block', marginBottom: '8px' }}>
                    Interview Type
                    <select
                        id="interviewType"
                        value={interviewType}
                        onChange={(e) => setInterviewType(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        aria-required="true"
                    >
                        <option value="phone">Phone</option>
                        <option value="video">Video</option>
                        <option value="in-person">In-Person</option>
                    </select>
                </label>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        type="button"
                        onClick={handleCancel}
                        style={{
                            backgroundColor: '#ccc', border: 'none', borderRadius: '4px',
                            padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#bbb'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ccc'}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#007bff', color: '#fff', border: 'none',
                            borderRadius: '4px', padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                    >
                        Schedule Interview
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InterviewScheduler;