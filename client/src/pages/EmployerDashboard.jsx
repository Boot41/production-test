import React from 'react';
import Header from './Header';
import JobPostingForm from './JobPostingForm';
import JobListingManager from './JobListingManager';
import Footer from './Footer';

const EmployerDashboard = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 right-0 bg-white shadow p-4 z-10" role="banner" aria-label="Employer Dashboard Header">
                <Header />
            </header>
            <main className="flex-grow mt-16 p-4">
                <JobPostingForm />
                <JobListingManager />
            </main>
            <footer className="bg-gray-200 p-4" role="contentinfo" aria-label="Footer with relevant links">
                <Footer />
            </footer>
        </div>
    );
};

export default EmployerDashboard;