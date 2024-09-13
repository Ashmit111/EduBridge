import React from 'react'
import { BookOpen, BookText, UserCog, Calendar, MessageSquare, HelpCircle, LogOut } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="h-screen w-64 bg-[#050816] text-white p-4 flex flex-col">
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center mb-2">
          <img src="/placeholder-user.jpg" alt="User's profile picture" className="w-full h-full object-cover rounded-full" />
        </div>
        <h2 className="text-lg font-semibold">User Name</h2>
        <p className="text-sm text-gray-400">Student</p>
      </div>
      <div className="flex-grow overflow-y-auto">
        <nav className="space-y-2">
          {/* <button className="w-full flex items-center text-white hover:bg-gray-700 p-2 rounded">
            <BookOpen className="mr-2 h-4 w-4" />
            My Courses
          </button> */}
          <button className="w-full flex items-center text-white hover:bg-gray-700 p-2 rounded">
            <BookText className="mr-2 h-4 w-4" />
            My Subjects
          </button>
          <button className="w-full flex items-center text-white hover:bg-gray-700 p-2 rounded">
            <UserCog className="mr-2 h-4 w-4" />
            Update Details
          </button>
          <button className="w-full flex items-center text-white hover:bg-gray-700 p-2 rounded">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </button>
          {/* <button className="w-full flex items-center text-white hover:bg-gray-700 p-2 rounded">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </button> */}
          <button className="w-full flex items-center text-white hover:bg-gray-700 p-2 rounded">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </button>
        </nav>
      </div>
      <button className="w-full flex items-center text-white hover:bg-gray-700 p-2 rounded mt-auto">
        <LogOut className="mr-2 h-4 w-4" />
        Log Out
      </button>
    </div>
  )
}
