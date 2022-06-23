// React
import React, { useState, useEffect } from "react";
// Day Picker
import { format } from "date-fns";
// Components
import Service from "./Service";
import BookingModal from "./BookingModal";
const AvailableAppointment = ({ onSelectedDate }) => {
  const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <section className="md:px-16 px-5 mb-32">
      <h3 className="font-bold  text-secondary text-center lg:mb-24 mb-14">
        Available Services on&nbsp;
        {onSelectedDate ? (
          format(onSelectedDate, "PP")
        ) : (
          <span className="text-red-600">no date selected</span>
        )}
      </h3>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-col-1 gap-8">
        {services.map((service) => (
          <Service
            key={service._id}
            service={service}
            onSetTreatment={setTreatment}
          />
        ))}
      </div>
      {treatment && (
        <BookingModal
          setTreatment={setTreatment}
          treatment={treatment}
          date={onSelectedDate}
        />
      )}
    </section>
  );
};

export default AvailableAppointment;
