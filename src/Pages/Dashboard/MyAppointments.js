// React
import React from "react";
// React Query
import { useQuery } from "react-query";
// React Firebase Hook
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
// Components
import Loading from "../Shared/Loading";
const MyAppointments = () => {
  const [user] = useAuthState(auth);

  const { data: appointments, isLoading } = useQuery("userAppointments", () =>
    fetch(`http://localhost:5000/booking?email=${user?.email}`).then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="my-3">My Total Appointments: {appointments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Treatment</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatmentName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
