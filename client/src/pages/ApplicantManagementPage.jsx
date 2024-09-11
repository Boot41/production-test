import React from 'react';

const Header = () => (
  <header style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#003366', color: '#ffffff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: '1000' }}>
    <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Applicant Management</h1>
    <nav>
      <a href="#dashboard" style={{ color: '#ffffff', marginRight: '15px' }}>Dashboard</a>
      <a href="#reports" style={{ color: '#ffffff' }}>Reports</a>
    </nav>
  </header>
);

const ApplicantManager = () => {
  return (
    <main style={{ marginTop: '60px', padding: '20px', backgroundColor: '#ffffff' }}>
      <div style={{ marginBottom: '20px' }}>
        <input type="text" aria-label="Search applicants" placeholder="Search applicants..." style={{ padding: '10px', width: '100%', border: '1px solid lightgray', borderRadius: '4px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Example of an applicant item */}
        <div style={{ border: '1px solid lightgray', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
          <h2 style={{ margin: '0 0 5px' }}>Applicant Name</h2>
          <p>Status: Active</p>
          <button style={{ marginRight: '5px' }}>View</button>
          <button>Edit</button>
        </div>
        {/* Additional applicants would be rendered here */}
      </div>
    </main>
  );
};

const Footer = () => (
  <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#f0f0f0', padding: '10px', textAlign: 'center' }}>
    <p style={{ margin: 0 }}>© 2023 Applicant Management System</p>
  </footer>
);

const ApplicantManagementPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <ApplicantManager />
      <Footer />
    </div>
  );
};

export default ApplicantManagementPage;