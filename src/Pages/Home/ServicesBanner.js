// React
import React from "react";
// Images
import treatment from "./../../assets/images/treatment.png";
// Components
import PrimaryButton from "../Shared/PrimaryButton";
const ServicesBanner = () => {
  return (
    <section className="hero min-h-screen md:px-16 px-5 mt-20">
      <div className="flex justify-center items-center flex-col lg:flex-row">
        <img
          src={treatment}
          alt="treatment"
          className="md:max-w-md w-sm rounded-lg shadow-2xl"
        />
        <div className="lg:ml-14 ml-0 mt-8">
          <h1 className="text-5xl font-bold">
            Exceptional Dental Care, on Your Terms
          </h1>
          <p className="py-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsumis that it has a more-or-less normal
            distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page
          </p>
          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default ServicesBanner;
