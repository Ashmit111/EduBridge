import React from 'react';

const YourSchedules = () => {
  // Sample schedule data
  const schedules = [
    {
      id: 1,
      date: '2024-09-20',
      time: '14:00',
      mentor: 'John Doe',
      subject: 'Mathematics',
    },
    {
      id: 2,
      date: '2024-09-22',
      time: '16:00',
      mentor: 'Jane Smith',
      subject: 'Physics',
    },
    {
      id: 3,
      date: '2024-09-25',
      time: '10:00',
      mentor: 'Alice Johnson',
      subject: 'Chemistry',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] p-6">
      <h1 className="text-3xl text-white text-center mb-8">Your Schedules</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-2">{schedule.subject}</h2>
            <p className="mb-1">
              <span className="font-semibold">Date:</span> {schedule.date}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Time:</span> {schedule.time}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Mentor:</span> {schedule.mentor}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourSchedules;