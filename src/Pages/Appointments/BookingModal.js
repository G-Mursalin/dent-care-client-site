// React
import React, { useState } from "react";
// Day Picker
import { format } from "date-fns";
// React Toastify
import { toast } from "react-toastify";
// React Hook
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const BookingModal = ({ treatment, date, setTreatment, onRefetch }) => {
  const { _id, name, slots, price } = treatment;
  const [isDateSelected, setIsDateSelected] = useState(true);
  const [user] = useAuthState(auth);
  const handleBooking = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const slot = e.target.slot.value;
    if (!/\d/.test(date)) {
      setIsDateSelected(false);
      return;
    }

    const booking = {
      treatmentId: _id,
      treatmentName: name,
      date: date,
      slot,
      price,
      patientName: user?.displayName,
      patientEmail: user?.email,
      phone: e.target.phone.value,
    };
    //  Send data to backend
    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success(`Appointment is set, ${date} at ${slot}`);
        } else {
          toast.warn(
            `You already have an appointment set on, ${data.booking?.date} at ${data.booking?.slot}`
          );
        }
        // Closed the model
        onRefetch();
        setTreatment(null);
      });
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
              value={user?.displayName || ""}
              disabled
              className="input input-bordered border-secondary w-full"
            />
            <input
              type="email"
              required
              name="email"
              placeholder="Email Address"
              value={user?.email || ""}
              disabled
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
