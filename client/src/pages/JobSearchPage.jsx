import React from 'react';
import JobSearchFilter from './JobSearchFilter';
import JobListing from './JobListing';

const JobSearchPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Fixed Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Job Search</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col flex-grow container mx-auto p-4">
        {/* Job Search Filter */}
        <section className="mb-4">
          <JobSearchFilter />
        </section>
        
        {/* Job Listing */}
        <section className="flex-grow">
          <JobListing />
        </section>
      </main>
    </div>
  );
};

export default JobSearchPage;