"use client";
import React, { useState } from "react";
import DaysOfWeek from "./DaysOfWeek";

const Calender = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [days, setDays] = useState([
    { day: "Mon", checked: false, startTime: "00:00", endTime: "00:00" },
    { day: "Tue", checked: false, startTime: "00:00", endTime: "00:00" },
    { day: "Wed", checked: false, startTime: "00:00", endTime: "00:00" },
    { day: "Thu", checked: false, startTime: "00:00", endTime: "00:00" },
    { day: "Fri", checked: false, startTime: "00:00", endTime: "00:00" },
  ]);

  const handleDayChange = (day, checked) => {
    setDays(days.map((d) => (d.day === day ? { ...d, checked } : d)));
  };
  const handleStartTime = (day, startTime) => {
    setDays(days.map((d) => (d.day === day ? { ...d, startTime } : d)));
  };
  const handleEndTime = (day, endTime) => {
    setDays(days.map((d) => (d.day === day ? { ...d, endTime } : d)));
  };

  const handleShowDrawer = () => {
    setShowDrawer(true);
  };
  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };
  return (
    <div>
      <div className="text-center">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          data-drawer-target="drawer-timepicker"
          data-drawer-show="drawer-timepicker"
          onClick={handleShowDrawer}
        >
          Set Time Schedule
        </button>
      </div>
      <div
        id="drawer-timepicker"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ease-linear bg-white w-96 dark:bg-gray-800
            ${showDrawer ? "translate-x-0" : "-translate-x-full"}`}
        tabIndex="-1"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Time schedule
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-timepicker"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={handleCloseDrawer}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <form>
          {days.map((day) => (
            <DaysOfWeek
              key={day.day}
              day={day.day}
              checked={day.checked}
              onCheckedChange={(checked) => handleDayChange(day.day, checked)}
              startTime={day.startTime}
              endTime={day.endTime}
              onStartTimeChange={(startTime) =>
                handleStartTime(day.day, startTime)
              }
              onEndTimeChange={(endTime) => handleEndTime(day.day, endTime)}
            />
          ))}
          {/* <button
            type="button"
            className="inline-flex items-center justify-center w-full py-2.5 mb-4 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg
              className="w-4 h-4 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7 7V5"
              />
            </svg>
            Add interval
          </button> */}
          <div className="grid grid-cols-2 gap-4 bottom-4 left-0 w-full md:px-4 md:absolute">
            <button
              type="button"
              data-drawer-hide="drawer-timepicker"
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={handleCloseDrawer}
            >
              Close
            </button>
            <button
              type="submit"
              className="text-white w-full inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save all
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Calender;
