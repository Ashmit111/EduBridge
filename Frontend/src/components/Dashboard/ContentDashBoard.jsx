import React, { useState } from 'react'

import { FaUser, FaBlog, FaUserTie, FaCalendar, FaQuestionCircle, FaSignOutAlt, FaStar, FaSearch, FaTimes } from 'react-icons/fa';
const mentors = [
    { id: 1, name: 'Rajiv Jain', rating: 4.8, specialty: 'React Development', bio: 'Experienced React developer with 10+ years in the industry.', experience: '10+ years', availability: 'Mon-Fri, 9AM-5PM', expertise: ['React', 'Redux', 'Node.js'] },
    { id: 2, name: 'Namo Prajapati', rating: 4.9, specialty: 'UI/UX Design', bio: 'Passionate UI/UX designer with a keen eye for detail.', experience: '8 years', availability: 'Tue-Sat, 10AM-6PM', expertise: ['Figma', 'Adobe XD', 'Sketch'] },
    { id: 3, name: 'Rahul Morya ', rating: 4.7, specialty: 'Full Stack Development', bio: 'Full stack developer with expertise in MERN stack.', experience: '7 years', availability: 'Mon-Thu, 11AM-7PM', expertise: ['MongoDB', 'Express', 'React', 'Node.js'] },
    { id: 4, name: 'Ramesh Garg', rating: 4.6, specialty: 'Python Programming', bio: 'Python enthusiast specializing in data science and machine learning.', experience: '6 years', availability: 'Wed-Sun, 9AM-5PM', expertise: ['Python', 'TensorFlow', 'PyTorch'] },
  ];

const ContentDashBoard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMentor, setSelectedMentor] = useState(null);
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredMentors = mentors.filter((mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleViewProfile = (mentor) => {
      setSelectedMentor(mentor);
    };
  
    const handleCloseProfile = () => {
      setSelectedMentor(null);
    };
  
  return (
    <>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Featured Mentors</h2>
          {selectedMentor ? (
            <div className="bg-[#1a1f35] rounded-lg p-6 relative">
              <button
                onClick={handleCloseProfile}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={24} />
              </button>
              <h3 className="text-2xl font-bold mb-4">{selectedMentor.name}</h3>
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{selectedMentor.rating}</span>
              </div>
              <p className="text-lg font-semibold mb-2">{selectedMentor.specialty}</p>
              <p className="mb-4">{selectedMentor.bio}</p>
              <p className="mb-2"><strong>Experience:</strong> {selectedMentor.experience}</p>
              <p className="mb-2"><strong>Availability:</strong> {selectedMentor.availability}</p>
              <div className="mb-4">
                <strong>Expertise:</strong>
                <ul className="list-disc list-inside mt-2">
                  {selectedMentor.expertise.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors" >
                Book a Session
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="bg-[#1a1f35] rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <h3 className="text-xl font-bold mb-2">{mentor.name}</h3>
                  <div className="flex items-center mb-2">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{mentor.rating}</span>
                  </div>
                  <p className="mb-4">{mentor.specialty}</p>
                  <button
                    onClick={() => handleViewProfile(mentor)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
    </>
  )
}

export default ContentDashBoard