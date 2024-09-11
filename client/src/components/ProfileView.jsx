import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ProfileView = ({ seekerId }) => {
    const [profile, setProfile] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [sectionToEdit, setSectionToEdit] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await axios.get(`/api/job-seekers/${seekerId}`);
            setProfile(response.data);
        };
        fetchProfile();
    }, [seekerId]);

    const handleEdit = (section) => {
        setSectionToEdit(section);
        setModalOpen(true);
    };

    const confirmEdit = () => {
        setModalOpen(false);
        history.push(`/edit/${sectionToEdit}`);
    };

    const handleBack = () => {
        history.goBack();
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="p-5 md:p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Profile View</h1>
            {['Personal Information', 'Work History', 'Education', 'Skills'].map((section, index) => (
                <div key={index} className="bg-[#e1daf5] rounded-lg p-5 mb-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">{section}</h2>
                        <button
                            onClick={() => handleEdit(section.toLowerCase().replace(' ', '-'))}
                            className="hover:text-[#b89aff] focus:outline-none"
                            aria-label={`Edit ${section}`}
                        >
                            ✏️
                        </button>
                    </div>
                    <p className="text-gray-700 mt-2">{profile[section.toLowerCase().replace(' ', '_')]}</p>
                </div>
            ))}
            <button 
                onClick={handleBack} 
                className="mt-4 p-2 bg-blue-500 text-white rounded hover:opacity-70 transition"
                aria-label="Back to previous page"
            >
                Back
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <p>Are you sure you want to edit this section?</p>
                        <button onClick={confirmEdit} className="mt-4 bg-green-500 text-white rounded p-2">Yes</button>
                        <button onClick={() => setModalOpen(false)} className="mt-4 bg-red-500 text-white rounded p-2 ml-2">No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileView;