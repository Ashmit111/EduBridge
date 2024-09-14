import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

const MeetingList = ({ userId }) => {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeetings = async () => {
            setLoading(true);
            const meetingsQuery = query(collection(db, 'meetings'), where('mentorId', '==', userId));
            const querySnapshot = await getDocs(meetingsQuery);
            const meetingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMeetings(meetingsData);
            setLoading(false);
        };

        if (userId) {
            fetchMeetings();
        }
    }, [userId]);

    // Function to generate meeting link and open the meeting
    const joinMeeting = (meeting) => {
        const roomId = `${meeting.studentId}-${meeting.mentorId}`; // Create a unique room ID
        const meetingUrl = `https://meet.jit.si/${roomId}`; // Generate the meeting URL with Jitsi

        // Open the meeting in a new tab
        window.open(meetingUrl, '_blank');
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Meetings</h2>
            {loading ? <p>Loading meetings...</p> : (
                meetings.length > 0 ? (
                    <ul>
                        {meetings.map(meeting => (
                            <li key={meeting.id} className="mb-4">
                                <p><strong>Student:</strong> {meeting.studentId}</p>
                                <p><strong>Date:</strong> {new Date(meeting.meetingTime).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {new Date(meeting.meetingTime).toLocaleTimeString()}</p>
                                <button 
                                    className="bg-green-500 text-white py-2 px-4" 
                                    onClick={() => joinMeeting(meeting)}
                                >
                                    Join Meeting
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : <p>No upcoming meetings</p>
            )}
        </div>
    );
};

export default MeetingList;