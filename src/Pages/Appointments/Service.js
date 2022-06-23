// React
import React from "react";
// Components

const Service = ({ service, onSetTreatment }) => {
  const { name, slots } = service;

  return (
    <div className="card shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-secondary">{name}</h2>
        <p>
          {slots.length ? (
            slots[0]
          ) : (
            <span className="text-red-600">No slots available</span>
          )}
        </p>
        <p>
          {slots.length} {slots.length > 1 ? "spaces" : "space"} available
        </p>
        <div className="card-actions justify-end">
          <label
            className="btn modal-button btn-primary uppercase font-bold text-white bg-gradient-to-r from-secondary to-primary"
            disabled={!slots.length}
            onClick={() => onSetTreatment(service)}
            htmlFor="booking-modal"
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default Service;