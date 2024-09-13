import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home/Home";
import Login from "./components/second/login";
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import { Dashboard } from "./components/Home/Dasboard";


import App from "./App";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Home />}>
      <Route path="/login" element={<Dashboard/>}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

