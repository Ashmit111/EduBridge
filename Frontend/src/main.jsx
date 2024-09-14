import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home/Home";
import Login from "./components/Login/login";
import Signup from "./components/Signup/SignUp";
import StudentSignup from "./components/Student_SignUp/StudentSignup";
import MentorSignup from "./components/MentorSignup/MentorSignup";
import StudentDashboard from "./components/studentDashboard/studentDashboard";
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import Dashboard from "./components/Dashboard/Dashboard";



import "./index.css";
import AddPost from "./components/AddPosts/AddPost";
import ContentDashBoard from "./components/Dashboard/ContentDashBoard";
import BlogCard from "./components/Dashboard/BlogCard";
import YourSchedules from "./components/Scheduled/Scheduled";
import SchedulePage from "./components/Schedule/Schedule";
import StudentProfile from "./components/Dashboard/StudentProfile";
import MentorDashboard from "./components/mentor-dashboard/Mentor-dashboard.jsx";
import UploadPDF from "./components/notesUpload/UploadPDF.jsx";
import MentorProfile from "./components/mentor-dashboard/Mentor-profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      

     

      <Route path="signup" element={<Signup />} />
      <Route path="/student-signup" element={<StudentSignup />} />
      <Route path="/mentor-signup" element={<MentorSignup />} />

      <Route path="/mentor-dashboard" element={<MentorDashboard />} >
        <Route path="profile" element={<MentorProfile/>}/>
        <Route path="add-post" element={<AddPost />} />
        <Route path="myblog" element={<BlogCard />} />
      </Route>

      <Route path="/student-dashboard" element={<StudentProfile />} />
      <Route path="uploadNotes" element={<UploadPDF/>} />

    </Route>
  )

)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

