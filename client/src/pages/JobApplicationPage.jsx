import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const JobApplicationPage = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex space-x-4">
            <li><a href="#home" className="text-gray-700">Home</a></li>
            <li><a href="#about" className="text-gray-700">About</a></li>
            <li><a href="#jobs" className="text-gray-700">Jobs</a></li>
          </ul>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </header>
      
      <main className="flex-grow p-4">
        <JobApplicationForm />
      </main>

      <footer className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
          <li><a href="#terms" className="hover:underline">Terms of Service</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </footer>
    </div>
  );
};

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic form validation
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    // Additional validation logic...

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      // Display confirmation modal logic...
      alert('Application submitted!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} aria-invalid={errors.name ? "true" : "false"} />
        {errors.name && <span className="text-red-500">{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange} aria-invalid={errors.email ? "true" : "false"} />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name="phone" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="position">Position Applied For</label>
        <input type="text" id="position" name="position" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="resume">Resume</label>
        <input type="file" id="resume" name="resume" onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })} />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
    </form>
  );
};

export default JobApplicationPage;