import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home/Home";
import Login from "./components/Login/login";
import Signup from "./components/Signup/SignUp";
import StudentSignup from "./components/Student_SignUp/StudentSignup";
import MentorSignup from "./components/MentorSignup/MentorSignup";
import { createBrowserRouter, createRoutesFromElements, Route,  RouterProvider } from 'react-router-dom'
import DashboardUser from "./components/Dashboard.user/Dashboard.jsx"


import "./index.css";
import AddPost from "./components/AddPosts/AddPost";
import ContentDashBoard from "./components/Dashboard.user/ContentDashBoard.jsx";
import BlogCard from "./components/Dashboard.user/BlogCard.jsx";
import YourSchedules from "./components/Scheduled/Scheduled";
import SchedulePage from "./components/Schedule/Schedule";
import MentorDashboard from "./components/mentor-dashboard/Mentor-dashboard.jsx";
import StudentDashboards from "./components/StudentDashboard/StudentDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="home" element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="add-post" element={<AddPost/>}/>
      <Route path="student-dashboard" element={<DashboardUser/>}>
        <Route path="mentor" element={<ContentDashBoard/>}/>
        <Route path="schedule" element={<YourSchedules/>}/>
        <Route path="blog" element={<BlogCard/>}/>
        <Route path="bookschedule" element={<SchedulePage/>}/>
      <Route path="profile" element={<StudentDashboards />} />
      </Route>
      {/* <Route path="mentor-dashboard" element={<DashboardMentor/>}>
        
    
      </Route> */}
      <Route path="signup" element={<Signup/>}/>
      <Route path="/student-signup" element={<StudentSignup />} />
      <Route path="/mentor-signup" element={<MentorSignup />} />
      <Route path="/mentor-dashboard" element={<MentorDashboard/>}/>
      {/* <Route path="/schedule-page" element={<SchedulePage />} /> */}
     

      
    </Route>
  )
  
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

