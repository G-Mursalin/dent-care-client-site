// React
import React from "react";
// React Query
import { useQuery } from "react-query";
// React Router
import { useNavigate, Link } from "react-router-dom";
// React Firebase Hook
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
// Components
import Loading from "../Shared/Loading";

const MyAppointments = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const { data: appointments, isLoading } = useQuery("userAppointments", () =>
    fetch(`https://dent-care.herokuapp.com/booking?email=${user?.email}`, {
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
      <h2 className="my-3 text-2xl">
        My Total Appointments: {appointments.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Treatment</th>
              <th>Payment</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatmentName}</td>
                <td>
                  {a.price && !a.paid && (
                    <Link to={`/dashboard/payment/${a._id}`}>
                      <button className="btn btn-xs btn-success">pay</button>
                    </Link>
                  )}
                  {a.price && a.paid && (
                    <span className="text-success">paid</span>
                  )}
                </td>
                <td>
                  {a.price && !a.paid && <span>Not Paid Yet</span>}
                  {a.price && a.paid && (
                    <span className="text-success">{a.transactionId}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
