// React
import React, { Fragment } from "react";
// Components
import Banner from "./Banner";
import Info from "./Info";
import HomeServices from "./HomeServices";
import ServicesBanner from "./ServicesBanner";
import HomeAppointment from "./HomeAppointment";
const Home = () => {
  return (
    <Fragment>
      <Banner />
      <Info />
      <HomeServices />
      <ServicesBanner />
      <HomeAppointment />
    </Fragment>
  );
};

export default Home;
