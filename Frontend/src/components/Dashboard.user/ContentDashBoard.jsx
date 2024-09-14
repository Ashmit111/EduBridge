import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore"; // Firestore import
import { db } from '../../firebase-config'; // Make sure to import your Firebase config

const ContentDashBoard = () => {
  const [mentors, setMentors] = useState([]); // State to store fetched mentors
  const [loading, setLoading] = useState(true); // Loading state

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
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Featured Mentors</h2>

      {loading ? (
        <p>Loading mentors...</p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentDashBoard;