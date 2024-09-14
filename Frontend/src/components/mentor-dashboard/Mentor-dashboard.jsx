import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const MentorDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [showProfile, setShowProfile] = useState(false); 
    const [editing, setEditing] = useState(false); 
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const userId = auth.currentUser?.uid; 

    useEffect(() => {
        if (userId) {
            const fetchProfile = async () => {
                try {
                    const docRef = doc(db, 'mentors', userId); // Assuming 'mentors' is the collection
                    const docSnap = await getDoc(docRef);
                    
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setProfile(data);
                        setFormData(data); // Initialize form data with profile data
                    } else {
                        setError("No such document!");
                    }
                } catch (error) {
                    setError("Error fetching profile data: " + error.message);
                }
            };

            fetchProfile();
        }
    }, [userId]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redirect to the landing page after logout
        } catch (error) {
            setError("Error signing out: " + error.message);
        }
    };

    const handleEditClick = () => {
        setEditing(!editing);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'mentors', userId);
            await updateDoc(docRef, formData);
            setProfile(formData); // Update local profile state
            setEditing(false); // Exit editing mode
        } catch (error) {
            setError("Error updating profile: " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-green-100 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-green-800 text-center mb-6">Mentor Dashboard</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    {showProfile ? 'Hide Profile' : 'View Profile'}
                </button>

                {showProfile && (
                    <div className="mt-4">
                        {editing ? (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="currentOccupation" className="block text-gray-700 font-bold mb-2">Current Occupation</label>
                                    <input
                                        type="text"
                                        id="currentOccupation"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        value={formData.currentOccupation}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="highestEducation" className="block text-gray-700 font-bold mb-2">Highest Education</label>
                                    <input
                                        type="text"
                                        id="highestEducation"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        value={formData.highestEducation}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="yearsOfExperience" className="block text-gray-700 font-bold mb-2">Years of Experience</label>
                                    <input
                                        type="text"
                                        id="yearsOfExperience"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        value={formData.yearsOfExperience}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="expertise" className="block text-gray-700 font-bold mb-2">Expertise</label>
                                    <input
                                        type="text"
                                        id="expertise"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        value={formData.expertise}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">Bio</label>
                                    <textarea
                                        id="bio"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows="3"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-700 text-white py-2 px-6 rounded-lg hover:bg-green-800 transition duration-200"
                                >
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            <div>
                                <p><strong>Full Name:</strong> {profile.fullName}</p>
                                <p><strong>Email:</strong> {profile.email}</p>
                                <p><strong>Current Occupation:</strong> {profile.currentOccupation}</p>
                                <p><strong>Highest Education:</strong> {profile.highestEducation}</p>
                                <p><strong>Years of Experience:</strong> {profile.yearsOfExperience}</p>
                                <p><strong>Expertise:</strong> {profile.expertise}</p>
                                <p><strong>Bio:</strong> {profile.bio}</p>
                                {profile.profilePicture && (
                                    <div>
                                        <img src={profile.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto"/>
                                    </div>
                                )}
                                <button
                                    onClick={handleEditClick}
                                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200 mt-4"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
                )}
                
                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default MentorDashboard;