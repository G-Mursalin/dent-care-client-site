// React
import React, { Fragment } from "react";
// Components
import Banner from "./Banner";
import Info from "./Info";
import HomeServices from "./HomeServices";
const Home = () => {
  return (
    <Fragment>
      <Banner />
      <Info />
      <HomeServices />
    </Fragment>
  );
};

export default Home;
