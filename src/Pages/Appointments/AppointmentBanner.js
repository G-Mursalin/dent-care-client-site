// React
import React, { useState } from "react";

//Images
import chair from "./../../assets/images/chair.png";
// Day Picker
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

const AppointmentBanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <section className="min-h-screen flex justify-center items-center md:px-16 px-5">
      <div className="flex justify-evenly items-center flex-col-reverse lg:flex-row w-full">
        <div>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>
        <img
          src={chair}
          alt="chair"
          className="md:max-w-2xl w-sm rounded-lg shadow-2xl"
        />
      </div>
    </section>
  );
};

export default AppointmentBanner;
