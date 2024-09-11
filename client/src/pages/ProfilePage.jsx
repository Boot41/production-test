import React, { useState } from 'react';

// Header Component
const Header = () => {
    return (
        <header style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'white', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                <div style={{ fontWeight: 'bold', fontSize: '24px' }}>Logo</div>
                <nav style={{ display: 'flex', gap: '1rem' }}>
                    <a href="#" style={{ textDecoration: 'none', color: 'black', padding: '0.5rem' }} onMouseOver={e => e.target.style.backgroundColor = '#f0f0f0'} onMouseOut={e => e.target.style.backgroundColor = 'transparent'}>Home</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'black', padding: '0.5rem' }} onMouseOver={e => e.target.style.backgroundColor = '#f0f0f0'} onMouseOut={e => e.target.style.backgroundColor = 'transparent'}>Profile</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'black', padding: '0.5rem' }} onMouseOver={e => e.target.style.backgroundColor = '#f0f0f0'} onMouseOut={e => e.target.style.backgroundColor = 'transparent'}>Settings</a>
                </nav>
            </div>
        </header>
    );
};

// ProfileView Component
const ProfileView = ({ onEdit }) => {
    return (
        <section style={{ padding: '80px 1rem 1rem', textAlign: 'center' }}>
            <img src="profile-pic.jpg" alt="Profile" style={{ borderRadius: '50%', width: '150px', height: '150px' }} />
            <h1 style={{ fontSize: '28px', margin: '1rem 0' }}>John Doe</h1>
            <p>Email: johndoe@example.com</p>
            <p>Skills: React, JavaScript, CSS</p>
            <p>Experience: 5 years in Web Development</p>
            <button onClick={onEdit} style={{ padding: '0.5rem 1rem', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit Profile</button>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#343a40', color: 'white', textAlign: 'center', padding: '1rem' }}>
            <p>&copy; 2023 Your Company. All rights reserved.</p>
            <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Privacy Policy</a> | 
            <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Terms of Service</a>
        </footer>
    );
};

// Main ProfilePage Component
const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };

    const closeModal = () => {
        setIsEditing(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: '0', fontFamily: 'Arial, sans-serif' }}>
            <Header />
            <ProfileView onEdit={handleEditButtonClick} />
            <Footer />
            {isEditing && (
                <div role="dialog" aria-labelledby="modal-title" aria-modal="true" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '2rem', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', zIndex: 2000 }}>
                    <h2 id="modal-title">Edit Profile</h2>
                    {/* Add form for editing profile here */}
                    <button onClick={closeModal} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Close</button>
                </div>
            )}
        </div>
    );
};

// Exporting the main ProfilePage
export default ProfilePage;