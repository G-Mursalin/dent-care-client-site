// React
import React from "react";
// React Firebase Hook
import { signOut } from "firebase/auth";
// React Query
import { useQuery } from "react-query";
// React Router
import { useNavigate } from "react-router-dom";
// React Firebase Hook
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const AllUsersRow = ({ user, index, refetch }) => {
  const { email, role } = user;
  const navigate = useNavigate();
  const makeAdmin = () => {
    fetch(`https://dent-care.herokuapp.com/user/admin/${email}`, {
      method: "PUT",
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
        if (data.acknowledged) {
          toast.success("Successfully made admin");
          refetch();
        }
      });
  };

  const deleteUser = () => {
    fetch(`https://dent-care.herokuapp.com/user/${email}`, {
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
        if (data.acknowledged) {
          toast.success("Successfully delete");
          refetch();
        }
      });
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{email}</td>
      <td>
        {role === "admin" ? (
          "Admin"
        ) : (
          <button className="btn btn-xs" onClick={makeAdmin}>
            Make Admin
          </button>
        )}
      </td>
      <td>
        <button className="btn btn-xs" onClick={deleteUser}>
          Remove User
        </button>
      </td>
    </tr>
  );
};

export default AllUsersRow;
