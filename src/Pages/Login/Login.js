// React
import React from "react";
// React Router
import { Link, useLocation, useNavigate } from "react-router-dom";
// React firebase hook
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
// React Form Hook
import { useForm } from "react-hook-form";
// Components
import Loading from "../Shared/Loading";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, epUser, epLoading, epError] =
    useSignInWithEmailAndPassword(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let showSignInError = "";
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  if (gError || epError) {
    showSignInError = (
      <p className="text-red-500 mb-2 text-sm">
        {gError?.message || epError?.message}
      </p>
    );
  }
  if (gLoading || epLoading) {
    return <Loading />;
  }
  if (gUser || epUser) {
    navigate(from, { replace: true });
  }

  return (
    <div className="flex h-screen justify-center items-center mt-4 md:px-16 px-5">
      <div className="card w-[500px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mx-auto">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              value="LOGIN"
              className="btn text-white bg-accent border-0 py-2 px-6 w-full focus:outline-none cursor-pointer rounded-lg text-lg"
            />
          </form>
          <p className="text-center">
            New to Dent Care?
            <Link to="/signup" className="text-secondary">
              &nbsp; Create New Account
            </Link>
          </p>
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline btn-accent uppercase"
          >
            Continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
