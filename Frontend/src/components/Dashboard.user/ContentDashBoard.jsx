import React, { useState, useEffect } from "react";
import { FaStar,FaTimes } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore"; // Firestore import
import { db } from '../../firebase-config'; // Make sure to import your Firebase config
import { useNavigate } from "react-router-dom";

const ContentDashBoard = () => {
  const [mentors, setMentors] = useState([]); // State to store fetched mentors
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedMentor, setSelectedMentor] = useState(null);
  const navigate = useNavigate();

  // Fetch mentors from Firestore
  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "mentors"));
        const mentorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          fullName: doc.data().fullName,
          rating: doc.data().rating,
          expertise: Array.isArray(doc.data().expertise) ? doc.data().expertise : [], // Ensure expertise is an array
        }));
        setMentors(mentorsData);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleViewProfile = (mentor) => {
    setSelectedMentor(mentor);
  };

  const NavigateUserToBook = () => {
    navigate("/student-dashboard/bookschedule");
  };

  const handleCloseProfile = () => {
    setSelectedMentor(null);
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Featured Mentors</h2>

      {loading ? (
        <p>Loading mentors...</p>
      ) :  selectedMentor ? ( 
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
            <p className="text-lg font-semibold mb-2">
              {selectedMentor.specialty}
            </p>
            <p className="mb-4">{selectedMentor.bio}</p>
            <p className="mb-2">
              <strong>Experience:</strong> {selectedMentor.experience}
            </p>
            <p className="mb-2">
              <strong>Availability:</strong> {selectedMentor.availability}
            </p>
            <div className="mb-4">
              <strong>Expertise:</strong>
              <ul className="list-disc list-inside mt-2">
                {selectedMentor.expertise.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
              onClick={NavigateUserToBook}
            >
              Book a Session
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-[#1a1f35] rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-xl font-bold mb-2">{mentor.fullName}</h3>
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{mentor.rating}</span>
              </div>
              <p className="mb-4">{mentor.expertise.length > 0 ? mentor.expertise.join(', ') : 'No expertise listed'}</p>
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
  );
};

export default ContentDashBoard;