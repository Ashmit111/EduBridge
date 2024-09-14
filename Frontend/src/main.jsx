import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home/Home";
import Login from "./components/Login/login";
import Signup from "./components/Signup/SignUp";
import StudentSignup from "./components/Student_SignUp/StudentSignup";
import MentorSignup from "./components/MentorSignup/MentorSignup";
import StudentDashboard from "./components/studentDashboard/studentDashboard";
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'


import App from "./App";
import "./index.css";
import Layout from "../layout";
import AddPost from "./components/AddPosts/AddPost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path="home" element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="add-post" element={<AddPost/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path="/student-signup" element={<StudentSignup />} />
      <Route path="/mentor-signup" element={<MentorSignup />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />

      
    </Route>
  )
  
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)

