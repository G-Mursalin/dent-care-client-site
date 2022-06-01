// React
import React, { Fragment } from "react";
// React Router
import { Routes, Route } from "react-router-dom";
// Components
import NavBar from "./Pages/Shared/NavBar";
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Appointments from "./Pages/Appointments/Appointments";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/appointment" element={<Appointments />} />
      </Routes>
    </Fragment>
  );
}

export default App;
