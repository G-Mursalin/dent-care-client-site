// React
import React, { Fragment, useState } from "react";
// Components
import AppointmentBanner from "./AppointmentBanner";
import AvailableAppointment from "./AvailableAppointment";
import Footer from "../Shared/Footer";
const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <Fragment>
      <AppointmentBanner
        onSelectedDate={selectedDate}
        onSetSelectedDate={setSelectedDate}
      />
      <AvailableAppointment onSelectedDate={selectedDate} />
      <Footer />
    </Fragment>
  );
};

export default Appointments;
