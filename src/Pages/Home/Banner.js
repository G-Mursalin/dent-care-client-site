// React
import React from "react";
// Images
import chair from "./../../assets/images/chair.png";

const Banner = () => {
  return (
    <section className="hero min-h-screen md:px-16 px-5">
      <div className="flex justify-center items-center flex-col lg:flex-row-reverse">
        <img
          src={chair}
          alt="chair"
          className="md:max-w-2xl w-sm rounded-lg shadow-2xl"
        />
        <div className="mr-0 lg:mr-8 lg:mt-0 mt-8">
          <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
          <p className="py-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the
          </p>
          <button className="btn btn-primary uppercase font-bold text-white bg-gradient-to-r from-secondary to-primary">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
