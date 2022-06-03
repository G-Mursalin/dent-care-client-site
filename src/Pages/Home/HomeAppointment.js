// React
import React from "react";
// Images
import doctor from "./../../assets/images/doctor-small.png";
import appointment from "./../../assets/images/appointment.png";
// Components
import PrimaryButton from "../Shared/PrimaryButton";
const HomeAppointment = () => {
  return (
    <section
      className="flex justify-center items-center flex-col lg:flex-row mt-40"
      style={{
        backgroundImage: `url(${appointment})`,
      }}
    >
      <div className="flex-1 mt-[-100px]">
        <img src={doctor} alt="doctor" />
      </div>
      <div className="flex-1 space-y-4 md:px-16 px-5 mt-4 py-8">
        <h3 className="font-bold text-secondary">Appointment</h3>
        <h1 className="text-3xl text-white font-bold">
          Make an appointment Today
        </h1>
        <p className="text-white">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsumis that it has a more-or-less normal distribution of
          letters,as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page
        </p>
        <PrimaryButton>Get Started</PrimaryButton>
      </div>
    </section>
  );
};

export default HomeAppointment;
