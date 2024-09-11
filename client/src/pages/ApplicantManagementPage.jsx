import React from 'react';
import InterviewScheduler from './InterviewScheduler';
import Applicant from './Applicant';

const ApplicantManagement = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Fixed header */}
      <header className="flex justify-between items-center p-4 shadow-md bg-white">
        <h1 className="text-xl font-bold">Applicant Management</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          aria-label="Add new applicant"
        >
          Add Applicant
        </button>
      </header>

      {/* Main content area */}
      <main className="flex-grow p-4">
        <InterviewScheduler />

        {/* Applicant List */}
        <div className="mt-4">
          {applicants.map((applicant, index) => (
            <div
              key={index}
              className="bg-white shadow-md border rounded my-2 p-4"
              aria-labelledby={`applicant-${index}`}
            >
              <h2 id={`applicant-${index}`} className="text-lg font-semibold">{applicant.name}</h2>
              <p className="text-sm text-gray-600">Status: {applicant.status}</p>
              <button
                className="bg-blue-500 text-white mt-2 py-1 px-3 rounded hover:bg-blue-600"
                aria-label={`View details for ${applicant.name}`}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ApplicantManagement;