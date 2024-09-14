import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const handleSelectUserType = (type) => {
        navigate(`/${type}-signup`);
    };

    const handleGoBack = () => {
        navigate(-1); // This will navigate to the previous page in the history
    };

    return (
        <div className="min-h-screen bg-hero-pattern bg-cover bg-center flex items-center justify-center">
            <div className=" p-10 rounded-lg shadow-lg w-full max-w-md text-center border">
                <h1 className="text-3xl font-bold text-bg2 mb-6">Create Your Account</h1>
                <p className="text-secondary mb-8">Please select your role to continue</p>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={() => handleSelectUserType('student')}
                        className="bg-bg2 text-black py-2 px-6 rounded-lg hover:border transition duration-200"
                    >
                        Sign Up as Student
                    </button>
                    <button
                        onClick={() => handleSelectUserType('mentor')}
                        className="bg-blue-400 text-black py-2 px-6 rounded-lg hover:border transition duration-200"
                    >
                        Sign Up as Mentor
                    </button>
                </div>
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

export default Signup;