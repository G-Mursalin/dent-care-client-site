// React
import React, { Fragment } from "react";
// Components
import Banner from "./Banner";
import Info from "./Info";
import HomeServices from "./HomeServices";
import ServicesBanner from "./ServicesBanner";
import HomeAppointment from "./HomeAppointment";
import Testimonial from "./Testimonial";
import HomeContactUs from "./HomeContactUs";
import Footer from "../Shared/Footer";
const Home = () => {
  return (
    <Fragment>
      <Banner />
      <Info />
      <HomeServices />
      <ServicesBanner />
      <HomeAppointment />
      <Testimonial />
      <HomeContactUs />
      <Footer />
    </Fragment>
  );
};

export default Home;
