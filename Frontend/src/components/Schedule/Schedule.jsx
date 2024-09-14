import React from 'react';

const SchedulePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050816]">
      <div className="bg-[#1a1a2e] p-6 rounded-lg text-center w-96"> {/* Increased width */}
        <h1 className="text-2xl text-white mb-4">Select Schedule</h1>
        <form>
          <div className="mb-4 text-left">
            <label htmlFor="date" className="block text-white mb-2">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full p-2 rounded-md border border-white bg-gray-200 text-black"
            />
          </div>
          <div className="mb-4 text-left">
            <label htmlFor="time" className="block text-white mb-2">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              className="w-full p-2 rounded-md border border-white bg-gray-200 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gray-300 text-black font-semibold hover:bg-gray-400"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SchedulePage;
