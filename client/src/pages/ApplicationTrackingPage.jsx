import React, { useState } from 'react';

const ApplicationTrackingPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleWithdrawClick = () => {
    setModalOpen(true);
  };

  const handleConfirmWithdraw = () => {
    // Handle withdrawal logic here
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white p-4">
      <header className="shadow-md p-4 bg-white">
        <h1 className="font-bold text-xl">Application Tracking</h1>
      </header>
      <main className="flex flex-col justify-center items-center flex-grow">
        <ApplicationStatusTracker />
        <WithdrawApplicationButton onClick={handleWithdrawClick} />
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="font-bold text-lg">Confirm Withdrawal</h2>
            <p>Are you sure you want to withdraw your application?</p>
            <div className="mt-4">
              <button onClick={handleConfirmWithdraw} className="bg-red-600 text-white px-4 py-2 rounded mr-2">
                Yes, Withdraw
              </button>
              <button onClick={() => setModalOpen(false)} className="border border-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ApplicationStatusTracker component
const ApplicationStatusTracker = () => {
  // Sample status data
  const status = "In Review"; // Replace with dynamic status logic
  
  return (
    <div className="border border-gray-300 p-4 rounded w-full sm:w-1/2">
      <h2 className="font-bold text-lg">Current Status</h2>
      <p className="text-md">{status}</p>
      {/* Progress indicator would be implemented here */}
    </div>
  );
};

// WithdrawApplicationButton component
const WithdrawApplicationButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-600 text-white font-bold px-6 py-3 mt-4 rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
      aria-label="Withdraw Application"
    >
      Withdraw Application
    </button>
  );
};

export default ApplicationTrackingPage;