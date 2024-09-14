import React, { useState } from 'react';

const StudentProfile = ({ student, onLogout, onUpdateProfile }) => {
    student = {
        fullName:"Jayesh",
        email:"email@gmail.com",
        fieldOfStudy:"history",
        graduationYear:2026,
        subjects:['history','OS',"DBMS"]
    }
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...student });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleUpdateProfile = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    onLogout(); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold mb-4 text-purple-400">
          Student Profile
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
              <p className="text-gray-300">{student.fullName}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Email</h2>
              <p className="text-gray-300">{student.email}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Field of Study</h2>
              <p className="text-gray-300">{student.fieldOfStudy}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Graduation Year</h2>
              <p className="text-gray-300">{student.graduationYear}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Subjects</h2>
              <ul className="list-disc list-inside text-gray-300">
                {student.subjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
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

export default StudentProfile;
