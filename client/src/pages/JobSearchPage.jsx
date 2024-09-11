import React from 'react';
import JobSearchFilter from './JobSearchFilter';
import JobListing from './JobListing';

const JobSearchPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg p-4 flex items-center justify-between">
        <div className="text-lg font-bold">Site Logo</div>
        <nav className="space-x-4">
          <a href="#home" className="text-blue-500 hover:underline">Home</a>
          <a href="#jobs" className="text-blue-500 hover:underline">Jobs</a>
          <a href="#about" className="text-blue-500 hover:underline">About</a>
        </nav>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-grow pt-20 p-4 bg-gray-100">
        {/* Job Search Filter */}
        <JobSearchFilter />
        
        {/* Job Listings */}
        <JobListing />
      </main>
    </div>
  );
};

export default JobSearchPage;