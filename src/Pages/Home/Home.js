// React
import React, { Fragment } from "react";
// Components
import Banner from "./Banner";
import Info from "./Info";
import HomeServices from "./HomeServices";
import ServicesBanner from "./ServicesBanner";
import HomeAppointment from "./HomeAppointment";
import Testimonial from "./Testimonial";
const Home = () => {
  return (
    <Fragment>
      <Banner />
      <Info />
      <HomeServices />
      <ServicesBanner />
      <HomeAppointment />
      <Testimonial />
    </Fragment>
  );
};

export default Home;
