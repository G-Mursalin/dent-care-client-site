// React
import React from "react";
// React Router
import { useParams, useNavigate } from "react-router-dom";
// React Query
import { useQuery } from "react-query";
// React Firebase Hook
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// Components
import Loading from "../Shared/Loading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L0ewEEKrvYKu07JVvEGZ9pVEVbsMczCJsd26URh6eFX7kvX1lTd23ou1x027Ny8qwIuKgc0ZAQgsmzHmz1oL5Vr00tLYw5o11"
);

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: booking, isLoading } = useQuery(["userPayBooking", id], () =>
    fetch(`http://localhost:5000/booking/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        navigate("/");
        signOut(auth);
        localStorage.removeItem("accessToken");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="my-3 text-2xl text-accent font-bold">
        <span className="text-green-500">Pay For:</span> {booking.treatmentName}
      </h2>
      <div className="px-8 mt-6">
        <div className="card text-primary-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-green-500 font-bold">
              Hello, {booking.patientName}
            </h2>
            <p className="text-lg">
              Your appointment:&nbsp;
              <span className="text-red-500 font-bold">{booking.date}</span>
              &nbsp;at&nbsp;
              <span className="text-red-500 font-bold">{booking.slot}</span>
            </p>
            <p className="text-lg">Please Pay:&nbsp;${booking.price}</p>
          </div>
        </div>
        <div className="card text-primary-content shadow-lg">
          <div className="card-body">
            <Elements stripe={stripePromise}>
              <CheckoutForm appointment={booking} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
