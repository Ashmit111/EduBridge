import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [showProfile, setShowProfile] = useState(false); // State to manage profile visibility
    const [editing, setEditing] = useState(false); // State to manage profile editing
    const [formData, setFormData] = useState({});
    const userId = auth.currentUser?.uid; // Get the current user's ID
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        if (userId) {
            const fetchProfile = async () => {
                try {
                    const docRef = doc(db, 'students', userId); // Assuming 'students' is the collection
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
            navigate('/login'); // Redirect to the landing page
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
            const docRef = doc(db, 'students', userId);
            await updateDoc(docRef, formData);
            setProfile(formData); // Update local profile state
            setEditing(false); // Exit editing mode
        } catch (error) {
            setError("Error updating profile: " + error.message);
        }
    };

    return (
        <div>
            <h1>Student Dashboard</h1>
            {error && <p className="text-red-500">{error}</p>}
            
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
                                <label htmlFor="fieldOfStudy" className="block text-gray-700 font-bold mb-2">Field of Study</label>
                                <input
                                    type="text"
                                    id="fieldOfStudy"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.fieldOfStudy}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="graduationYear" className="block text-gray-700 font-bold mb-2">Graduation Year</label>
                                <input
                                    type="text"
                                    id="graduationYear"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.graduationYear}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="subjects" className="block text-gray-700 font-bold mb-2">Subjects</label>
                                <input
                                    type="text"
                                    id="subjects"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.subjects}
                                    onChange={handleChange}
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
                            <p><strong>Field of Study:</strong> {profile.fieldOfStudy}</p>
                            <p><strong>Graduation Year:</strong> {profile.graduationYear}</p>
                            <p><strong>Subjects:</strong> {profile.subjects}</p>
                            <button
                                onClick={handleEditClick}
                                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200"
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            )}
            
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
                Logout
            </button>
        </div>
    );
};

export default StudentDashboard;