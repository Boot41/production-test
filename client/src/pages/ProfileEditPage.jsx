import React from 'react';

const ProfileEditPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 shadow-md bg-white flex justify-between items-center p-4 z-10">
        <div className="text-xl font-bold">Logo</div>
        <nav className="space-x-4">
          <a href="#home" className="hover:text-blue-500">Home</a>
          <a href="#profile" className="hover:text-blue-500">Profile</a>
          <a href="#settings" className="hover:text-blue-500">Settings</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <ProfileEditor />
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

const ProfileEditor = () => {
  const handleSave = () => {
    // Function to handle save action
    alert('Profile saved successfully!');
  };

  return (
    <form className="max-w-lg mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <label htmlFor="name" className="block mb-2">
        Name:
        <input type="text" id="name" className="border rounded w-full p-2" aria-required="true" />
      </label>
      <label htmlFor="jobTitle" className="block mb-2">
        Job Title:
        <input type="text" id="jobTitle" className="border rounded w-full p-2" aria-required="true" />
      </label>
      <label htmlFor="bio" className="block mb-2">
        Bio:
        <textarea id="bio" className="border rounded w-full p-2" aria-required="true"></textarea>
      </label>
      <label htmlFor="skills" className="block mb-2">
        Skills:
        <input type="text" id="skills" className="border rounded w-full p-2" aria-required="true" />
      </label>
      <label htmlFor="experience" className="block mb-2">
        Experience:
        <textarea id="experience" className="border rounded w-full p-2" aria-required="true"></textarea>
      </label>
      <button type="button" className="bg-blue-500 text-white rounded p-2 mt-4" onClick={handleSave}>Save</button>
    </form>
  );
};

export default ProfileEditPage;