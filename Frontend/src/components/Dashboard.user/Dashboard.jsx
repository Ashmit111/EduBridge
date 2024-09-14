import React, { useState } from 'react';

import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';



const DashboardUser = () => {
 
  return (
    <div className="flex h-screen bg-[#050816] text-white">
      {/* Sidebar */}
    <SideBar/>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Navbar */}
        <NavBar/>

        {/* Content */}
        <Outlet/>
      </div>
    </div>
  );
};

export default DashboardUser;