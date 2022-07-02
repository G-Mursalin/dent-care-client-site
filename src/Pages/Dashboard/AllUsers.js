// React
import React from "react";
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
import AllUsersRow from "./AllUsersRow";
const AllUsers = () => {
  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("allUsers", () =>
    fetch("http://localhost:5000/users", {
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
      <h2 className="my-3">Total User: {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <AllUsersRow
                key={user._id}
                user={user}
                index={idx}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
