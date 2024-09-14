import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const formDataProfile = () => {

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const userId = auth.currentUser?.uid; // Get the current user's ID
    const navigate = useNavigate(); // For navigation
    useEffect(() => {
        if (userId) {
            const fetchProfile = async () => {
                try {
                    const docRef = doc(db, 'formDatas', userId); // Assuming 'formDatas' is the collection
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
    console.log(profile);
    

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const docRef = doc(db, 'formDatas', userId);
        await updateDoc(docRef, formData);
        setProfile(formData); // Update local profile state
        setIsEditing(false); // Exit editing mode
    } catch (error) {
        setError("Error updating profile: " + error.message);
    }
};

  const handleUpdateProfile = () => {
    setIsEditing(true);
  };

  const handleLogout = async () => {
    try {
        await signOut(auth);
        navigate('/login'); // Redirect to the landing page
    } catch (error) {
        setError("Error signing out: " + error.message);
    }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold mb-4 text-purple-400">
          formData Profile
        </h1>
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="fullName" className="text-xl font-semibold">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-xl font-semibold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="fieldOfStudy" className="text-xl font-semibold">
                Field of Study
              </label>
              <input
                id="fieldOfStudy"
                name="fieldOfStudy"
                type="text"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="graduationYear" className="text-xl font-semibold">
                Graduation Year
              </label>
              <input
                id="graduationYear"
                name="graduationYear"
                type="text"
                value={formData.graduationYear}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="subjects" className="text-xl font-semibold">
                Subjects (comma-separated)
              </label>
              <input
                id="subjects"
                name="subjects"
                type="text"
                value={formData.subjects.join(', ')}
                onChange={(e) => handleChange({
                  target: {
                    name: 'subjects',
                    value: e.target.value.split(',').map(subj => subj.trim()),
                  },
                })}
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
                required
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Full Name</h2>
              <p className="text-gray-300">{profile.fullName}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Email</h2>
              <p className="text-gray-300">{profile.email}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Field of Study</h2>
              <p className="text-gray-300">{profile.fieldOfStudy}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Graduation Year</h2>
              <p className="text-gray-300">{profile.graduationYear}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Subjects</h2>
              <ul className="list-disc list-inside text-gray-300">
                {profile.subjects.map((subject) => (
                  <li key={subject}>{subject}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Update Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default formDataProfile;
