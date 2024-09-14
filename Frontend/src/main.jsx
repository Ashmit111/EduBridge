import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home/Home";
import Layout from "./Layout";
import Login from './components/Login/login'
import VideoCall from "./components/VideoCall/VideoCall";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import "./index.css";
import AddPost from "./components/AddPosts/AddPost";
import Calender from "./components/Calender/Calender";
import MentorCard from "./components/MentorCard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="home" element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="add-post" element={<AddPost/>}/>
      <Route path="/room/:roomID" element={< VideoCall/>}/>
      <Route path="/calender" element={<Calender/>}/>
      <Route path="/mentor" element={<MentorCard/>}/>
    </Route>
  )
  
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

