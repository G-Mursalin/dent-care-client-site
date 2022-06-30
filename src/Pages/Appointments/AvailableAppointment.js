// React
import React, { useState } from "react";
// Day Picker
import { format } from "date-fns";
// React Query
import { useQuery } from "react-query";
// Components
import Service from "./Service";
import BookingModal from "./BookingModal";
import Loading from "../Shared/Loading";

const AvailableAppointment = ({ onSelectedDate }) => {
  // const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState(null);
  let formattedDate = "";
  if (onSelectedDate) {
    formattedDate = format(onSelectedDate, "PP");
  }
  const {
    data: services,
    isLoading,
    refetch,
  } = useQuery(["availableSlots", formattedDate], () =>
    fetch(`http://localhost:5000/available?date=${formattedDate}`).then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <Loading />;
  }

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
          onRefetch={refetch}
        />
      )}
    </section>
  );
};

export default AvailableAppointment;
