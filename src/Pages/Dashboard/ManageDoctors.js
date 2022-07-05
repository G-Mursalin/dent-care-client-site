// React
import React, { useState } from "react";
// React Query
import { useQuery } from "react-query";
// React Firebase Hook
import { signOut } from "firebase/auth";
// React Router
import { useNavigate } from "react-router-dom";
// React Firebase Hook
import auth from "../../firebase.init";
// Components
import Loading from "../Shared/Loading";
import ManageDoctorsRow from "./ManageDoctorsRow";
import DeleteDoctorModal from "./DeleteDoctorModal";
const ManageDoctors = () => {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery("allDoctors", () =>
    fetch("http://localhost:5000/doctor", {
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
    <section>
      <h2 className="my-2 text-2xl">Total Listed Doctor: {doctors.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, i) => (
              <ManageDoctorsRow
                key={doctor._id}
                doctor={doctor}
                index={i}
                setDoctorInfo={setDoctorInfo}
              ></ManageDoctorsRow>
            ))}
          </tbody>
        </table>
      </div>
      {doctorInfo && (
        <DeleteDoctorModal
          doctorInfo={doctorInfo}
          setDoctorInfo={setDoctorInfo}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default ManageDoctors;
