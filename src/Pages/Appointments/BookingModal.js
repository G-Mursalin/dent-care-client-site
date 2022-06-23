// React
import React, { useState } from "react";
// Day Picker
import { format } from "date-fns";
const BookingModal = ({ treatment, date, setTreatment }) => {
  const { name, slots } = treatment;
  const [isDateSelected, setIsDateSelected] = useState(true);

  const handleBooking = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    if (!/\d/.test(date)) {
      setIsDateSelected(false);
      return;
    }
    setTreatment(null);
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            onClick={() => setIsDateSelected(true)}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg mb-3 text-secondary">{name}</h3>
          <form className="grid grid-cols-1 gap-3" onSubmit={handleBooking}>
            <input
              type="text"
              name="date"
              disabled
              value={date ? format(date, "PP") : "No date selected"}
              className="input input-bordered border-secondary w-full"
            />
            {!isDateSelected ? (
              <p className="text-red-600 text-sm ml-3 -mt-3">
                *Please select a date from calender
              </p>
            ) : (
              ""
            )}
            <select
              name="slot"
              className="select select-bordered border-secondary w-full"
            >
              {slots.map((slot, i) => (
                <option key={i} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              required
              name="name"
              placeholder="Your Name"
              className="input input-bordered border-secondary w-full"
            />
            <input
              type="text"
              required
              name="email"
              placeholder="Email Address"
              className="input input-bordered border-secondary w-full"
            />
            <input
              type="text"
              required
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered border-secondary w-full"
            />
            <input
              type="submit"
              value="submit"
              className="btn btn-secondary w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
