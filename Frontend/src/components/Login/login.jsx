import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { app, db } from '../../firebase-config'; // Ensure db is correctly imported

const Login = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student'); 
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleBack = () => {
        window.history.back();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch the user document from Firestore based on the userType
            const userDoc = await getDoc(doc(db, userType === 'student' ? 'students' : 'mentors', user.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();

                // Check if the logged-in user has the correct role
                if (userData.role !== userType) {
                    setError(`You are not registered as a ${userType}.`);
                    return;
                }

                // Navigate to the appropriate dashboard
                navigate(`/${userType}-dashboard`);
            } else {
                setError(`No user found for the ${userType} role.`);
            }
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Fetch the user document from Firestore
            const userDoc = await getDoc(doc(db, userType === 'student' ? 'students' : 'mentors', user.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();

                // Check if the logged-in user has the correct role
                if (userData.role !== userType) {
                    setError(`You are not registered as a ${userType}.`);
                    return;
                }

                // Navigate to the appropriate dashboard
                navigate(`/${userType}-dashboard/profile`);
            } else {
                setError(`No user found for the ${userType} role.`);
            }
        } catch (error) {
            setError("Google sign-in failed. Please try again.");
        }
    };


    return (
        <div className="min-h-screen bg-hero-pattern  bg-cover bg-center flex items-center justify-center"  >
            <div className=" p-10 rounded-lg shadow-lg w-full max-w-md border">
                <h1 className="text-3xl font-bold text-bg2 text-center mb-6">Welcome Back</h1>
                <p className="text-center text-secondary  mb-8">Login to your account</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="userType" className="block text-secondary font-bold mb-2">I am a</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="student"
                                name="userType"
                                value="student"
                                checked={userType === 'student'}
                                onChange={() => setUserType('student')}
                                className="mr-2 t"
                            />
                            <label htmlFor="student" className="mr-4 text-white-100">Student</label>
                            <input
                                type="radio"
                                id="mentor"
                                name="userType"
                                value="mentor"
                                checked={userType === 'mentor'}
                                onChange={() => setUserType('mentor')}
                                className="mr-2 "
                            />
                            <label htmlFor="mentor" className='text-white-100'>Mentor</label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-secondary font-bold mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-secondary font-bold mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <Link to="/forgot-password" className="text-yellow-500 hover:underline">Forgot Password?</Link>
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex space-x-4">
                        <button className="bg-bg text-white hover:border py-2 px-6 w-full rounded-lg transition duration-200" type="submit">
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={handleBack}
                            className="w-full py-3 rounded-lg text-black  bg-white hover:bg-gray-300 transition-colors"
                        >
                            Back
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full py-3 rounded-lg  bg-bg text-white-100 hover:border transition-colors"
                    > 
                        Continue with Google
                    </button>
                </div>

                <p className="text-center text-secondary mt-6">Don’t have an account? <Link to="/signup" className="text-yellow-500 hover:underline">Sign up</Link></p>
            </div>
        </div>
    );
};

export default Login;