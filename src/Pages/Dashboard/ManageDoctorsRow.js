// React
import React from "react";

const ManageDoctorsRow = ({ doctor, index, setDoctorInfo }) => {
  return (
    <tr key={doctor._id}>
      <th>{index + 1}</th>
      <td>
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img src={doctor.imgUrl} alt={doctor.name} />
          </div>
        </div>
      </td>
      <td>{doctor.name}</td>
      <td>{doctor.email}</td>
      <td>{doctor.specialty}</td>
      <td>
        <label
          className="btn btn-xs btn-error modal-button"
          htmlFor="doctor-delete-modal"
          onClick={() => setDoctorInfo(doctor)}
        >
          Delete
        </label>
      </td>
    </tr>
  );
};

export default ManageDoctorsRow;
