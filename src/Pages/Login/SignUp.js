// React
import React from "react";
// React Form Hook
import { useForm } from "react-hook-form";
// React Router
import { Link, useNavigate } from "react-router-dom";
// React firebase hook
import auth from "../../firebase.init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
// Components
import Loading from "../Shared/Loading";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const [createUserWithEmailAndPassword, ePUser, ePLoading, ePError] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [token] = useToken(ePUser || gUser);
  let showSignInError = "";
  const navigate = useNavigate();
  if (ePError || gError || error) {
    showSignInError = (
      <p className="text-red-500 mb-2 text-sm">
        {ePError?.message || gError?.message || error?.message}
      </p>
    );
  }
  if (ePLoading || gLoading || updating) {
    return <Loading />;
  }
  if (token) {
    navigate("/appointment");
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    navigate("/appointment");
  };

  return (
    <div className="flex h-screen justify-center items-center md:mt-0 mt-4 md:px-16 px-5">
      <div className="card w-[500px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mx-auto">SignUp</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Provide a valid email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be more than 6 character",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {showSignInError}
            <input
              type="submit"
              value="SIGNUP"
              className="btn text-white bg-accent border-0 py-2 px-6 w-full focus:outline-none cursor-pointer rounded-lg text-lg"
            />
          </form>
          <p className="text-center">
            Already have an account?
            <Link to="/login" className="text-secondary">
              &nbsp;LogIn
            </Link>
          </p>
          <div className="divider">OR</div>
          <button
            className="btn btn-outline btn-accent uppercase"
            onClick={() => signInWithGoogle()}
          >
            Continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
