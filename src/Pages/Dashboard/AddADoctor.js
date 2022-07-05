// React
import React, { useState, useEffect } from "react";
// React Query
import { useQuery } from "react-query";
// React Firebase Hook
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
// React Router
import { useNavigate } from "react-router-dom";
// React Tostify
import { toast } from "react-toastify";
// Components
import Loading from "../Shared/Loading";
const AddADoctor = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const { data: specialty, isLoading } = useQuery("specialty", () =>
    fetch("http://localhost:5000/services", {
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
  const handleAddProduct = (e) => {
    e.preventDefault();
    const addDoctorInfo = {
      name: e.target.name.value,
      email: e.target.email.value,
      specialty: e.target.specialty.value,
    };
    const imgStorageKey = "c52e775809a1317e74d6f4056dd40a16";
    const formData = new FormData();
    formData.append("image", file);
    fetch(`https://api.imgbb.com/1/upload?key=${imgStorageKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          addDoctorInfo.imgUrl = result.data.image.url;
        }

        // Send to data base
        fetch("http://localhost:5000/doctor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(addDoctorInfo),
        })
          .then((res) => {
            if (res.status === 401 || res.status === 403) {
              localStorage.removeItem("accessToken");
              signOut(auth);
              navigate("/");
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            if (data.success) {
              toast.success("Doctor Added Successfully");
            } else {
              toast.error("Failed to add the doctor");
            }
          });
      });

    e.target.reset();
  };
  return (
    <div>
      <h2 className="my-3 text-2xl">Add a doctor</h2>
      <div className="container px-5 mx-auto">
        <form onSubmit={handleAddProduct} className="mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 md:w-1/2 w-full">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Doctor Name
                </label>
                <input
                  type="text"
                  required
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 md:w-1/2 w-full">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Doctor Email
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 md:w-1/2 w-full">
              <div className="relative">
                <label
                  htmlFor="img"
                  className="leading-7 text-sm text-gray-600"
                >
                  Doctor Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                  id="img"
                  name="img"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  md:w-1/2 w-full">
              <div className="relative">
                <label
                  htmlFor="specialty"
                  className="leading-7 text-sm text-gray-600"
                >
                  Pick Specialty
                </label>
                <select
                  name="specialty"
                  id="specialty"
                  className="select w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  {specialty.map((val) => (
                    <option key={val._id} value={val.name}>
                      {val.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-2 w-full">
              <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddADoctor;
