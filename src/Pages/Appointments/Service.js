// React
import React from "react";
// Components
import PrimaryButton from "../Shared/PrimaryButton";

const Service = ({ service }) => {
  const { name, slots } = service;

  return (
    <div className="card shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-secondary">{name}</h2>
        <p>{slots[0]}</p>
        <div className="card-actions justify-end">
          <PrimaryButton>Book Appointment</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Service;
