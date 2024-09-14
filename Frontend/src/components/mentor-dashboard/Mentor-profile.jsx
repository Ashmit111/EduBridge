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
                    setProfile(docSnap.data());
                    setFormData(docSnap.data());
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
        <div>
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            {editing ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block mb-2">Full Name</label>
                        <input
                            id="fullName"
                            value={formData.fullName || ''}
                            onChange={handleChange}
                            className="block w-full mb-2 p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            className="block w-full mb-2 p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="currentOccupation" className="block mb-2">Occupation</label>
                        <input
                            id="currentOccupation"
                            value={formData.currentOccupation || ''}
                            onChange={handleChange}
                            className="block w-full mb-2 p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="highestEducation" className="block mb-2">Highest Education</label>
                        <input
                            id="highestEducation"
                            value={formData.highestEducation || ''}
                            onChange={handleChange}
                            className="block w-full mb-2 p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="yearsOfExperience" className="block mb-2">Years of Experience</label>
                        <input
                            id="yearsOfExperience"
                            value={formData.yearsOfExperience || ''}
                            onChange={handleChange}
                            className="block w-full mb-2 p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="expertise" className="block mb-2">Expertise</label>
                        <input
                            id="expertise"
                            value={formData.expertise || ''}
                            onChange={handleChange}
                            className="block w-full mb-2 p-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                </form>
            ) : (
                <div>
                    <p><strong>Full Name:</strong> {profile?.fullName}</p>
                    <p><strong>Email:</strong> {profile?.email}</p>
                    <p><strong>Occupation:</strong> {profile?.currentOccupation}</p>
                    <p><strong>Highest Education:</strong> {profile?.highestEducation}</p>
                    <p><strong>Years of Experience:</strong> {profile?.yearsOfExperience}</p>
                    <p><strong>Expertise:</strong> {profile?.expertise}</p>
                    <button
                        onClick={handleEdit}
                        className="bg-yellow-500 text-white py-2 px-4 rounded mt-4 hover:bg-yellow-600"
                    >
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;