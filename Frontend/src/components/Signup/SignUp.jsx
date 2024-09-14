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
        <div className="min-h-screen bg-green-100 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-green-800 mb-6">Create Your Account</h1>
                <p className="text-gray-600 mb-8">Please select your role to continue</p>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={() => handleSelectUserType('student')}
                        className="bg-green-700 text-white py-2 px-6 rounded-lg hover:bg-green-800 transition duration-200"
                    >
                        Sign Up as Student
                    </button>
                    <button
                        onClick={() => handleSelectUserType('mentor')}
                        className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition duration-200"
                    >
                        Sign Up as Mentor
                    </button>
                </div>
                <button
                    onClick={handleGoBack}
                    className="mt-6 text-green-500 hover:underline"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Signup;