import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase-config';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const docRef = doc(db, 'mentors', userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProfile(data);
                    setFormData(data);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        if (userId) fetchProfile();
    }, [userId]);

    const handleEdit = () => setEditing(!editing);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'mentors', userId);
            await updateDoc(docRef, formData);
            setProfile(formData);
            setEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-purple-400">Profile</h2>
                
                {editing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {['fullName', 'email', 'currentOccupation', 'highestEducation', 'yearsOfExperience', 'expertise'].map(field => (
                            <div key={field} className="mb-4">
                                <label htmlFor={field} className="block text-xl font-semibold mb-2">
                                    {field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                </label>
                                <input
                                    id={field}
                                    value={formData[field] || ''}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                                    required
                                />
                            </div>
                        ))}
                        <div className="flex justify-between mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        {profile ? (
                            <>
                                {['fullName', 'email', 'currentOccupation', 'highestEducation', 'yearsOfExperience', 'expertise'].map(field => (
                                    <div key={field} className="mb-4">
                                        <h3 className="text-xl font-semibold">
                                            {field.replace(/([A-Z])/g, ' $1').toUpperCase()}:
                                        </h3>
                                        <p className="text-gray-300">{profile[field] || 'N/A'}</p>
                                    </div>
                                ))}
                                <button
                                    onClick={handleEdit}
                                    className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
                                >
                                    Edit Profile
                                </button>
                            </>
                        ) : (
                            <p className="text-gray-300">Loading profile data...</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
