import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import MyBlogs from './MyBlogs';
import MeetingList from './MeetingList'; // Assume you have the MeetingList component
import Profile from './Mentor-profile'; // Component for Mentor Profile
import BlogPost from './BlogPost'; // Import the BlogPost component

const MentorDashboard = () => {
    const [activeSection, setActiveSection] = useState(''); // Track which section is active
    const navigate = useNavigate();

    // Handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); 
        } catch (error) {
            console.error("Error signing out: " + error.message);
        }
    };
    const toggleSection = (section) => {
        if (activeSection === section) {
            setActiveSection(''); 
        } else {
            setActiveSection(section); 
        }
    };

    return (
        <div className="min-h-screen flex">
            <aside className="w-64 bg-gray-800 text-white p-5">
                <h2 className="text-2xl font-bold mb-8">Mentor Dashboard</h2>
                <nav>
                    <ul>
                        <li>
                            <button
                                className={`w-full text-left p-3 hover:bg-gray-700 ${activeSection === 'profile' ? 'bg-gray-700' : ''}`}
                                onClick={() => toggleSection('profile')}
                            >
                                Profile
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left p-3 hover:bg-gray-700 ${activeSection === 'meetings' ? 'bg-gray-700' : ''}`}
                                onClick={() => toggleSection('meetings')}
                            >
                                Meetings
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left p-3 hover:bg-gray-700 ${activeSection === 'blogs' ? 'bg-gray-700' : ''}`}
                                onClick={() => toggleSection('blogs')}
                            >
                                My Blogs
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left p-3 hover:bg-gray-700 ${activeSection === 'postBlog' ? 'bg-gray-700' : ''}`}
                                onClick={() => toggleSection('postBlog')}
                            >
                                Post Blog
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full text-left p-3 hover:bg-red-600"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div className="flex-1 bg-primary">
                <header className="bg-gray-100 p-4 shadow">
                    <h1 className="text-3xl font-bold">Welcome, Mentor</h1>
                </header>

                <div className="p-6 bg-primary">
                    {activeSection === 'profile' && <Profile />}
                    {activeSection === 'meetings' && <MeetingList userId={auth.currentUser?.uid} />}
                    {activeSection === 'blogs' && <MyBlogs />}
                    {activeSection === 'postBlog' && <BlogPost />} 
                </div>
            </div>
        </div>
    );
};

export default MentorDashboard;