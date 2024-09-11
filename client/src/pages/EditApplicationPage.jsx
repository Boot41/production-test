import React, { useState } from 'react';

const EditApplicationPage = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    applicationStatus: '',
    notes: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here
    alert('Changes saved!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold" aria-label="Edit Job Application">Edit Job Application</h1>
      </header>
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <form onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              aria-required="true"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-sm font-medium mb-2">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              aria-required="true"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="applicationStatus" className="block text-sm font-medium mb-2">Application Status</label>
            <select
              id="applicationStatus"
              name="applicationStatus"
              value={formData.applicationStatus}
              onChange={handleChange}
              required
              aria-required="true"
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select status</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500">
            Save Changes
          </button>
        </form>
      </main>
      <footer className="bg-gray-200 text-gray-600 p-4 ">
        <nav>
          <a href="/contact" className="mr-4">Contact Us</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default EditApplicationPage;