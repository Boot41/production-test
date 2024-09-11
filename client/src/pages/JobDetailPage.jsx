import React, { useState } from 'react';

// Header Component
const Header = () => {
  return (
    <header className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
      <div className="text-lg font-serif">Site Logo</div>
      <nav className="hidden md:flex space-x-4">
        <a href="#about" className="text-blue-600 hover:underline">About</a>
        <a href="#jobs" className="text-blue-600 hover:underline">Jobs</a>
        <a href="#contact" className="text-blue-600 hover:underline">Contact</a>
      </nav>
      {/* Hamburger menu for mobile screens */}
      <div className="md:hidden">
        <button className="focus:outline-none">☰</button>
      </div>
    </header>
  );
};

// JobDetailView Component
const JobDetailView = ({ onApply }) => {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Job Title</h1>
      <h2 className="text-lg font-serif">Company Name</h2>
      <p className="mt-4">Job description goes here. Details about the role, responsibilities, and qualifications.</p>
      <button 
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400" 
        onClick={onApply}
        aria-label="Apply for this job"
      >
        Apply Now
      </button>
    </main>
  );
};

// Modal for Application Submission
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md w-1/3">
        <h2 className="text-xl font-serif">Apply for Job</h2>
        <form aria-labelledby="application-form">
          <label htmlFor="name" className="block mt-2">Name:</label>
          <input type="text" id="name" className="border w-full p-2 rounded" required aria-required="true" />

          <label htmlFor="email" className="block mt-2">Email:</label>
          <input type="email" id="email" className="border w-full p-2 rounded" required aria-required="true" />

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            onClick={onClose}
          >
            Submit Application
          </button>
        </form>
        <button className="mt-2 text-red-600" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="fixed bottom-0 bg-white shadow-md p-4 w-full">
      <div className="text-center">
        <a href="#privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
        {' | '}
        <a href="#terms" className="text-blue-600 hover:underline">Terms of Service</a>
        {' | '}
        <span>Contact Info</span>
      </div>
    </footer>
  );
};

// Main JobDetailPage Component
const JobDetailPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleApply = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <JobDetailView onApply={handleApply} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Footer />
    </div>
  );
};

// Exporting the JobDetailPage component
export default JobDetailPage;