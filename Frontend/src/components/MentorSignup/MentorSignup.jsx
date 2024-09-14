import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { uploadProfilePicture } from '../UploadFunction/UploadFunction';

const MentorSignup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [highestEducation, setHighestEducation] = useState('');
    const [expertiseFields, setExpertiseFields] = useState(['']); // Start with one empty field
    const [currentOccupation, setCurrentOccupation] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const handleAddExpertise = () => {
        setExpertiseFields([...expertiseFields, '']); // Add a new empty field
    };

    const handleRemoveExpertise = (index) => {
        const updatedFields = expertiseFields.filter((_, i) => i !== index);
        setExpertiseFields(updatedFields);
    };

    const handleExpertiseChange = (index, value) => {
        const updatedFields = [...expertiseFields];
        updatedFields[index] = value;
        setExpertiseFields(updatedFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            let profilePictureUrl = null;
            if (profilePicture) {
                profilePictureUrl = await uploadProfilePicture(profilePicture);
            }

            await setDoc(doc(db, 'mentors', user.uid), {
                fullName,
                email,
                profilePicture: profilePictureUrl, 
                highestEducation,
                expertise: expertiseFields, // Save as an array
                currentOccupation,
                yearsOfExperience,
                bio,
                role: 'mentor' 
            });
            
            navigate('/mentor-dashboard');
        } catch (error) {
            console.error("Error signing up:", error);
            setError("An error occurred while signing up. Please try again.");
        }
    };

    const handleProfilePictureChange = async (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            try {
                const url = await uploadProfilePicture(file);
                setProfilePicture(url); 
            } catch (error) {
                console.error('Error uploading profile picture:', error);
                setError('Failed to upload profile picture. Please try again.');
            }
        }
    };

    const handleGoBack = () => {
        navigate(-1); 
    };

    return (
        <div className="min-h-screen bg-hero-pattern flex items-center justify-center">
            <div className="border p-10 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-bg2 text-center mb-6">Mentor Signup</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-secondary font-bold mb-2">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-secondary font-bold mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-secondary font-bold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="profilePicture" className="block text-secondary font-bold mb-2">Profile Picture (Optional)</label>
                        <input
                            type="file"
                            id="profilePicture"
                            className="w-full px-4 py-2 border text-white border-gray-300 rounded-lg"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="highestEducation" className="block text-secondary font-bold mb-2">Highest Level of Education</label>
                        <input
                            type="text"
                            id="highestEducation"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={highestEducation}
                            onChange={(e) => setHighestEducation(e.target.value)}
                            required
                        />
                    </div>
                    {/* Expertise Section */}
                    <div className="mb-4">
                        <label className="block text-secondary font-bold mb-2">Field(s) of Expertise</label>
                        {expertiseFields.map((field, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={field}
                                    onChange={(e) => handleExpertiseChange(index, e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mr-2"
                                    placeholder={`Expertise ${index + 1}`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExpertise(index)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddExpertise}
                            className="bg-bg hover:border text-white py-2 px-4 rounded-lg"
                        >
                            Add Expertise
                        </button>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="currentOccupation" className="block text-secondary font-bold mb-2">Current Occupation</label>
                        <input
                            type="text"
                            id="currentOccupation"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={currentOccupation}
                            onChange={(e) => setCurrentOccupation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="yearsOfExperience" className="block text-secondary font-bold mb-2">Years of Experience</label>
                        <input
                            type="number"
                            id="yearsOfExperience"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={yearsOfExperience}
                            onChange={(e) => setYearsOfExperience(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-secondary font-bold mb-2">Bio</label>
                        <textarea
                            id="bio"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows="4"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-bg text-white py-2 px-6 rounded-lg hover:bg-bg2 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <button
                    onClick={handleGoBack}
                    className="mt-6 text-bg2 hover:underline"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default MentorSignup;