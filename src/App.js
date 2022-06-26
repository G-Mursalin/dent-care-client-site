// React
import React, { Fragment } from "react";
// React Router
import { Routes, Route } from "react-router-dom";
// Components
import NavBar from "./Pages/Shared/NavBar";
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Appointments from "./Pages/Appointments/Appointments";
import Reviews from "./Pages/Reviews/Reviews";
import Contact from "./Pages/ContactUs/Contact";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Login/SignUp";
import RequireAuth from "./Pages/Login/RequireAuth";
function App() {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/appointment"
          element={
            <RequireAuth>
              <Appointments />
            </RequireAuth>
          }
        />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Fragment>
  );
}

export default App;
