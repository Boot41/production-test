import React, { useState } from 'react';

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg p-4 flex justify-between items-center z-10">
      <h1 className="text-lg font-bold">Application Tracking</h1>
      <nav className="hidden md:flex space-x-4">
        <a href="#applications" className="text-blue-500">Applications</a>
        <a href="#about" className="text-blue-500">About</a>
      </nav>
      <button
        className="md:hidden p-2"
        aria-label="Toggle menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? '✖️' : '☰'}
      </button>
      {isMenuOpen && (
        <nav className="absolute right-0 top-12 bg-white shadow-lg p-4">
          <a href="#applications" className="block text-blue-500">Applications</a>
          <a href="#about" className="block text-blue-500">About</a>
        </nav>
      )}
    </header>
  );
};

// ApplicationStatusTracker Component
const ApplicationStatusTracker = () => {
  const [filter, setFilter] = useState('all');

  const applications = [
    { id: 1, title: 'Frontend Developer', company: 'Company A', status: 'applied' },
    { id: 2, title: 'Backend Developer', company: 'Company B', status: 'interview' },
    { id: 3, title: 'Full Stack Developer', company: 'Company C', status: 'offer' },
  ];

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  return (
    <main className="mt-16 p-4">
      <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
      <div className="mb-4">
        <label htmlFor="status-filter" className="mr-2">Filter:</label>
        <select 
          id="status-filter" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="applied">Applied</option>
          <option value="interview">Interviews</option>
          <option value="offer">Offers</option>
        </select>
      </div>
      <div className="bg-white shadow-md p-4 rounded">
        {filteredApplications.map(app => (
          <div key={app.id} className="mb-3 border-b pb-2">
            <h3 className="text-lg font-bold">{app.title}</h3>
            <p className="text-gray-600">{app.company}</p>
            <p className="text-blue-500">{app.status}</p>
            <button className="text-blue-500 mt-2">View Details</button>
          </div>
        ))}
      </div>
    </main>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4">
      <p className="text-center text-gray-600">© 2023 Company Name</p>
      <a href="#privacy" className="text-blue-500">Privacy Policy</a>
    </footer>
  );
};

// ApplicationTrackingPage Component
const ApplicationTrackingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ApplicationStatusTracker />
      <Footer />
    </div>
  );
};

export default ApplicationTrackingPage;