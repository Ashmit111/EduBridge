import React from 'react'
import { FaUser, FaUserTie, FaCalendar, FaQuestionCircle, FaSignOutAlt,FaMeetup } from 'react-icons/fa';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';




const SideBar = () => {
    const navigate = useNavigate()
    const ChooseProfile = () => {
        navigate(`/mentor-dashboard/profile`);
    }
    const AddPost = () => {
        navigate(`/mentor-dashboard/add-post`);
    }
    const MyBlogs = () => {
        navigate(`/mentor-dashboard/myblog`);
    }
  return (
        <div className="w-64 bg-[#0a0e1f] p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors" onClick={ChooseProfile}>
            <FaUser />
            <span>Profile</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors" onClick={AddPost}>
          <IoIosAddCircleOutline />
            <span>Add Blog</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors"onClick={MyBlogs}>
            <FaUserTie />
            <span>My Blogs</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors">
            <FaCalendar />
            <span> My Schedule</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors">
          <FaMeetup />
            <span> Start Meet</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors">
            <FaQuestionCircle />
            <span>Help</span>
          </li>
          
        </ul>
          <button className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors pt-96"> <FaSignOutAlt />
          <span>Logout</span></button>
           
      </div>
  )
}

export default SideBar