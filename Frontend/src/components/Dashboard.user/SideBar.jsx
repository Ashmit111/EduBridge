
import { FaUser, FaBlog, FaUserTie, FaCalendar, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {

    const navigate = useNavigate();

    const ChooseProfile = () => {
        navigate(`/student-dashboard/profile`);
    }
    const ChooseBlog = () => {
        navigate(`/student-dashboard/blog`);
    }
    const ChooseMentor = () => {
        navigate(`/student-dashboard/mentor`);
    }
    const ChooseSchedule = () => {
        navigate(`/student-dashboard/schedule`);
    }

  return ( 
        <div className="w-64 bg-[#0a0e1f] p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-6 pt-4">
          <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors"  onClick={ChooseProfile}>
            <FaUser />
            <span>Profile</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors" onClick={ChooseBlog}>
            <FaBlog />
            <span>Blog</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors" onClick={ChooseMentor}>
            <FaUserTie />
            <span>Mentors</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors" onClick={ChooseSchedule}>
            <FaCalendar />
            <span>Schedule</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors">
            <FaQuestionCircle />
            <span>Help</span>
          </li>
          
        </ul>
        <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors mt-96">
            <FaSignOutAlt />
            <span>Logout</span>
          </li>
      </div>
  )
}

export default SideBar