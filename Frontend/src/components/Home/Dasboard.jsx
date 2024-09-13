
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export function Dashboard() {
  return (
    <Sidebar aria-label="Sidebar with search bar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 text-sm text-gray-700"
          />
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

// import React from 'react'
// import {  BookText, UserCog, Calendar,  HelpCircle, LogOut } from 'lucide-react'

// export default function Dashboard() {
//   return (
//     <div className="h-screen w-64 bg-[#050816] text-white p-4 flex flex-col">
//       <div className="flex flex-col items-center mb-6">
//         <div className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center mb-2">
//           <img src="/placeholder-user.jpg" alt="User's profile picture" className="w-full h-full object-cover rounded-full" />
//         </div>
//         <h2 className="text-lg font-semibold">User Name</h2>
//         <p className="text-sm text-gray-400">Student</p>
//       </div>
//       <div className="flex-grow overflow-y-auto">
//         <nav className="space-y-2">
//           <button className="w-full flex items-center text-white hover:bg-gray-700 p-2 rounded">
//             <BookText className="mr-2 h-4 w-4" />
//             My Subjects
//           </button>
//           <button className="w-full flex items-center text-white hover:bg-gray-700 p-2 rounded">
//             <UserCog className="mr-2 h-4 w-4" />
//             Update Details
//           </button>
//           <button className="w-full flex items-center text-white hover:bg-gray-700 p-2 rounded">
//             <Calendar className="mr-2 h-4 w-4" />
//             Schedule
//           </button>
        
//           <button className="w-full flex items-center text-white hover:bg-gray-700 p-2 rounded">
//             <HelpCircle className="mr-2 h-4 w-4" />
//             Help & Support
//           </button>
//         </nav>
//       </div>
//       <button className="w-full flex items-center text-white hover:bg-gray-700 p-2 rounded mt-auto">
//         <LogOut className="mr-2 h-4 w-4" />
//         Log Out
//       </button>
//     </div>
//   )
// }
