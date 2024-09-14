import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState    ('');
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  return (
    <>
        <div className="bg-[#0a0e1f] p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold mt-3">Welcome, User!</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search mentors..."
              className="bg-[#1a1f35] text-white px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
    </>
  )
}

export default NavBar