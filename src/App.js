// React
import React, { Fragment } from "react";
// React Router
import { Routes, Route } from "react-router-dom";
// Components
import NavBar from "./Pages/Shared/NavBar";
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Fragment>
  );
}

export default App;
