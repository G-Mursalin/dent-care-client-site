// React
import React, { useState, useEffect } from "react";
// React Router
import { useNavigate } from "react-router-dom";
// React Firebase Hook
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
// Stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ appointment }) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { _id, price, patientName, patientEmail } = appointment;

  useEffect(() => {
    fetch("https://dent-care.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          navigate("/");
          signOut(auth);
          localStorage.removeItem("accessToken");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    //confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: patientEmail,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      setSuccess("Congrats! your payment is completed.");

      // Update payment to database
      const payment = {
        transactionId: paymentIntent.id,
        appointment: _id,
      };
      setProcessing(true);
      fetch(`https://dent-care.herokuapp.com/booking/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            navigate("/");
            signOut(auth);
            localStorage.removeItem("accessToken");
          }
          return res.json();
        })
        .then((data) => {
          setProcessing(false);
        });
    }
  };

  if (processing) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
          },
        }}
      />
      {cardError && <p className="mt-3 text-red-500">{cardError}</p>}
      {success && (
        <p className="mt-3 text-green-500">
          {success}
          <span className="block font-bold">Your Transaction ID:</span>
          {transactionId}
        </p>
      )}
      <button
        className="btn btn-success btn-sm mt-3"
        type="submit"
        disabled={!stripe || !clientSecret || success}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
