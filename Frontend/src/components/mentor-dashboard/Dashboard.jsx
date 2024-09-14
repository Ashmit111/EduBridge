import React, { useState } from 'react';


import { Outlet } from 'react-router-dom';
import NavBarMentor from './Navbar';
import SideBarMentor from './Sidebar';




const DashboardMentor = () => {
 
  return (
    <div className="flex h-screen bg-[#050816] text-white">
      {/* Sidebar */}
    <SideBarMentor/>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Navbar */}
        <NavBarMentor/>

        {/* Content */}
        <Outlet/>
      </div>
    </div>
  );
};

export default DashboardMentor;