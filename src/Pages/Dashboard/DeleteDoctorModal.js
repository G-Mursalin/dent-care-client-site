// React
import React from "react";
// React Firebase Hook
import { signOut } from "firebase/auth";
// React Router
import { useNavigate } from "react-router-dom";
// React Toastify
import { toast } from "react-toastify";
// React Firebase Hook
import auth from "../../firebase.init";
const DeleteDoctorModal = ({ doctorInfo, setDoctorInfo, refetch }) => {
  const navigate = useNavigate();
  const handleDoctorDelete = () => {
    fetch(`https://dent-care.herokuapp.com/doctor/${doctorInfo.email}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
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
        if (data.deletedCount) {
          refetch();
          toast.success("Successfully Deleted");
        } else {
          toast.error("Can't delete doctor!");
        }
      });
    setDoctorInfo(null);
  };
  return (
    <div>
      <input
        type="checkbox"
        id="doctor-delete-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="doctor-delete-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-2xl mb-3">
            Are you sure you want to delete this Doctor?
          </h3>
          <div>
            <p>
              <span className="font-bold">Doctor Name:</span>&nbsp;
              {doctorInfo.name}
            </p>
            <p>
              <span className="font-bold">Doctor Email:</span>&nbsp;
              {doctorInfo.email}
            </p>
          </div>

          <div className="modal-action">
            <label htmlFor="doctor-delete-modal" className="btn">
              Cancel
            </label>
            <label onClick={handleDoctorDelete} className="btn btn-error">
              Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDoctorModal;
