// import React, { useEffect, useState } from 'react';
// import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
// import { auth, db } from '../../firebase-config';
// import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';

// const MentorDashboard = () => {
//     const [profile, setProfile] = useState(null);
//     const [error, setError] = useState(null);
//     const [showProfile, setShowProfile] = useState(false); 
//     const [editing, setEditing] = useState(false); 
//     const [formData, setFormData] = useState({});
//     const [meetings, setMeetings] = useState([]);
//     const [loadingMeetings, setLoadingMeetings] = useState(true);
//     const navigate = useNavigate();
//     const userId = auth.currentUser?.uid; 

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const docRef = doc(db, 'mentors', userId); 
//                 const docSnap = await getDoc(docRef);
                
//                 if (docSnap.exists()) {
//                     const data = docSnap.data();
//                     setProfile(data);
//                     setFormData(data); 
//                 } else {
//                     setError("No such document!");
//                 }
//             } catch (error) {
//                 setError("Error fetching profile data: " + error.message);
//             }
//         };

//         const fetchMeetings = async () => {
//             setLoadingMeetings(true); // Set loading to true before fetching
//             try {
//                 const meetingsQuery = query(
//                     collection(db, 'meetings'),
//                     where('mentorId', '==', userId)
//                 );
//                 const querySnapshot = await getDocs(meetingsQuery);
        
//                 console.log('Query snapshot size:', querySnapshot.size); // Log the size of the result
        
//                 const meetingsData = querySnapshot.docs.map(doc => {
//                     console.log('Meeting Data:', doc.data()); // Log each meeting document
//                     return {
//                         id: doc.id,
//                         ...doc.data()
//                     };
//                 });
                
//                 setMeetings(meetingsData);
//                 console.log('Meetings Data:', meetingsData); // Log the meetings array
//             } catch (error) {
//                 setError("Error fetching meetings: " + error.message);
//                 console.error("Error fetching meetings:", error); // Log error details
//             } finally {
//                 setLoadingMeetings(false); // Set loading to false after fetching
//             }
            
//         };
        

//         if (userId) {
//             fetchProfile();
//             fetchMeetings();
//         }
//     }, [userId]);

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             navigate('/'); 
//         } catch (error) {
//             setError("Error signing out: " + error.message);
//         }
//     };

//     const handleEditClick = () => {
//         setEditing(!editing);
//     };

//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [id]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const docRef = doc(db, 'mentors', userId);
//             await updateDoc(docRef, formData);
//             setProfile(formData); 
//             setEditing(false); 
//         } catch (error) {
//             setError("Error updating profile: " + error.message);
//         }
//     };

//     const joinMeeting = (meeting) => {
//         const roomId = `${meeting.studentId}-${meeting.mentorId}`; // Unique room ID
//         const domain = 'https://meet.jit.si/';
//         const meetingUrl = `${domain}${roomId}`;
    
//         // Open the meeting in a new tab
//         window.open(meetingUrl, '_blank');
//     };
    

//     return (
//         <div className="min-h-screen bg-green-100 flex items-center justify-center">
//             <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
//                 <h1 className="text-3xl font-bold text-green-800 text-center mb-6">Mentor Dashboard</h1>
//                 {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
//                 <button
//                     onClick={() => setShowProfile(!showProfile)}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
//                 >
//                     {showProfile ? 'Hide Profile' : 'View Profile'}
//                 </button>

//                 {showProfile && profile && (
//                     <div className="mt-4">
//                         {editing ? (
//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-4">
//                                     <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Full Name</label>
//                                     <input
//                                         type="text"
//                                         id="fullName"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                         value={formData.fullName || ''}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="currentOccupation" className="block text-gray-700 font-bold mb-2">Current Occupation</label>
//                                     <input
//                                         type="text"
//                                         id="currentOccupation"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                         value={formData.currentOccupation || ''}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="highestEducation" className="block text-gray-700 font-bold mb-2">Highest Education</label>
//                                     <input
//                                         type="text"
//                                         id="highestEducation"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                         value={formData.highestEducation || ''}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="yearsOfExperience" className="block text-gray-700 font-bold mb-2">Years of Experience</label>
//                                     <input
//                                         type="text"
//                                         id="yearsOfExperience"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                         value={formData.yearsOfExperience || ''}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="expertise" className="block text-gray-700 font-bold mb-2">Expertise</label>
//                                     <input
//                                         type="text"
//                                         id="expertise"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                         value={formData.expertise || ''}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">Bio</label>
//                                     <textarea
//                                         id="bio"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                         value={formData.bio || ''}
//                                         onChange={handleChange}
//                                         rows="3"
//                                         required
//                                     />
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className="bg-green-700 text-white py-2 px-6 rounded-lg hover:bg-green-800 transition duration-200"
//                                 >
//                                     Save Changes
//                                 </button>
//                             </form>
//                         ) : (
//                             <div>
//                                 <p><strong>Full Name:</strong> {profile.fullName}</p>
//                                 <p><strong>Email:</strong> {profile.email}</p>
//                                 <p><strong>Current Occupation:</strong> {profile.currentOccupation}</p>
//                                 <p><strong>Highest Education:</strong> {profile.highestEducation}</p>
//                                 <p><strong>Years of Experience:</strong> {profile.yearsOfExperience}</p>
//                                 <p><strong>Expertise:</strong> {profile.expertise}</p>
//                                 <p><strong>Bio:</strong> {profile.bio}</p>
//                                 {profile.profilePicture && (
//                                     <div>
//                                         <img src={profile.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto"/>
//                                     </div>
//                                 )}
//                                 <button
//                                     onClick={handleEditClick}
//                                     className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200 mt-4"
//                                 >
//                                     Edit Profile
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 )}

// <h2 className="text-xl font-bold text-green-800 mt-6 mb-4">Upcoming Meetings</h2>
//             {loadingMeetings ? (
//                 <p>Loading meetings...</p>
//             ) : (
//                 <div>
//                     {meetings.length === 0 ? (
//                         <p>No upcoming meetings.</p>
//                     ) : (
//                         <ul>
//                             {meetings.map(meeting => (
//                                 <li key={meeting.id} className="bg-gray-100 p-4 mb-2 rounded-lg shadow">
//                                     <p><strong>Date:</strong> {new Date(meeting.meetingTime).toLocaleDateString()}</p>
//                                     <p><strong>Time:</strong> {new Date(meeting.meetingTime).toLocaleTimeString()}</p>
//                                     <p><strong>Student:</strong> {meeting.studentId}</p>
//                                     <button
//                                         onClick={() => joinMeeting(meeting)}
//                                         className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
//                                     >
//                                         Join Meeting
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             )}

//             <div id="jitsi-container"></div> {/* Jitsi meeting will be embedded here */}

//             <button
//                 onClick={handleLogout}
//                 className="mt-6 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200"
//             >
//                 Logout
//             </button>
//         </div>
//     </div>
// )
// };

// export default MentorDashboard;


import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const MentorProfile = () => {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({});
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
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
                    setError('No such document!');
                }
            } catch (error) {
                setError('Error fetching profile data: ' + error.message);
            }
        };

        if (userId) {
            fetchProfile();
        }
    }, [userId]);

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
            setProfile(formData);
            setEditing(false);
        } catch (error) {
            setError('Error updating profile: ' + error.message);
        }
    };

    const handleEditClick = () => {
        setEditing(!editing);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/home');
        } catch (error) {
            setError('Error signing out: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-4xl font-bold text-secondary text-center mb-8">Mentor Profile</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <button
                    onClick={handleEditClick}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 mb-6"
                >
                    {editing ? 'Cancel' : 'Edit Profile'}
                </button>

                {editing ? (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-secondary font-bold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.fullName || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-secondary font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="currentOccupation" className="block text-secondary font-bold mb-2">Current Occupation</label>
                                <input
                                    type="text"
                                    id="currentOccupation"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.currentOccupation || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="highestEducation" className="block text-secondary font-bold mb-2">Highest Education</label>
                                <input
                                    type="text"
                                    id="highestEducation"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.highestEducation || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="yearsOfExperience" className="block text-secondary font-bold mb-2">Years of Experience</label>
                                <input
                                    type="text"
                                    id="yearsOfExperience"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.yearsOfExperience || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="expertise" className="block text-secondary font-bold mb-2">Expertise</label>
                                <input
                                    type="text"
                                    id="expertise"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.expertise || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4 col-span-2">
                                <label htmlFor="bio" className="block text-secondary font-bold mb-2">Bio</label>
                                <textarea
                                    id="bio"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.bio || ''}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-bg text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200"
                        >
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <div>
                        {profile && (
                            <div className=''>
                                <div className="flex items-center mb-6">
                                    {profile.profilePicture && (
                                        <img src={profile.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mr-6"/>
                                    )}
                                    <div >
                                        <p className="text-white  mb-4"><strong className='mr-2 text-bg2'>Full Name :</strong> {profile.fullName}</p>
                                        <p className="text-white  mb-4"><strong className='mr-2 text-bg2' >Email:</strong> {profile.email}</p>
                                        <p className="text-white  mb-4"><strong className='mr-2 text-bg2'>Current Occupation:</strong> {profile.currentOccupation}</p>
                                        <p className="text-white  mb-4"><strong className='mr-2 text-bg2'>Highest Education:</strong> {profile.highestEducation}</p>
                                        <p className="text-white  mb-4"><strong className='mr-2 text-bg2'>Years of Experience:</strong> {profile.yearsOfExperience}</p>
                                        <p className="text-white  mb-4"><strong className='mr-2 text-bg2'>Expertise:</strong> {profile.expertise}</p>
                                        <p className="text-white  mb-4"><strong className='mr-2 text-bg2'>Bio:</strong> {profile.bio}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default MentorProfile;







