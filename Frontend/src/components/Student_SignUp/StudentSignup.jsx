import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import { doc, setDoc } from 'firebase/firestore';

const subjectsList = [
    { value: 'Math', label: 'Math' },
    { value: 'Science', label: 'Operating System' },
    { value: 'History', label: 'Database Management System' },
    { value: 'English', label: 'Python' }
];

const StudentSignup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [error, setError] = useState(null); // State for error messages
    const navigate = useNavigate();

    const handleSubjectChange = (event) => {
        const { value, checked } = event.target;
        setSelectedSubjects(prevSubjects => 
            checked ? [...prevSubjects, value] : prevSubjects.filter(subject => subject !== value)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save student details to Firestore
            await setDoc(doc(db, 'students', user.uid), {
                fullName,
                email,
                fieldOfStudy,
                graduationYear,
                subjects: selectedSubjects,
                role: 'student' // Add role field
            });

            navigate('/dashboard/mentor');
        } catch (error) {
            console.error("Error signing up:", error);
            setError("An error occurred while signing up. Please try again."); // Display error message
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="min-h-screen bg-hero-pattern bg-cover bg-center flex items-center justify-center">
            <div className=" p-10 rounded-lg shadow-lg w-full max-w-md border">
                <h1 className="text-3xl font-bold text-bg2 text-center mb-6">Student Signup</h1>
                {error && <p className="text-red-700 text-center mb-4">{error}</p>} {/* Display error message */}
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
                        <label htmlFor="fieldOfStudy" className="block text-secondary font-bold mb-2">Field of Study</label>
                        <input
                            type="text"
                            id="fieldOfStudy"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={fieldOfStudy}
                            onChange={(e) => setFieldOfStudy(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="graduationYear" className="block text-secondary font-bold mb-2">Expected Graduation Year</label>
                        <input
                            type="number"
                            id="graduationYear"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={graduationYear}
                            onChange={(e) => setGraduationYear(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-secondary font-bold mb-2">Subjects You Need Help With</label>
                        {subjectsList.map((subject) => (
                            <div key={subject.value} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={subject.value}
                                    value={subject.value}
                                    checked={selectedSubjects.includes(subject.value)}
                                    onChange={handleSubjectChange}
                                    className="mr-2"
                                />
                                <label htmlFor={subject.value} className="text-secondary">{subject.label}</label>
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="bg-bg text-white py-2 px-6 rounded-lg hover:border transition duration-200"
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

export default StudentSignup;