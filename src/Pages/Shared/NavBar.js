// React
import React, { Fragment, useState } from "react";
// React Router
import { NavLink } from "react-router-dom";
// React Firebase Hook
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
const NavBar = () => {
  const [showNavItems, setShowNavItems] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  // NavBar Items
  const menuItems = (
    <Fragment>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li tabIndex="0">
        <NavLink to="/about" className="justify-between">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/appointment">Appointment</NavLink>
      </li>
      <li>
        <NavLink to="/reviews">Reviews</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
      <li>
        {user ? (
          <button className="btn btn-outline" onClick={() => signOut(auth)}>
            Sign Out
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar bg-base-100 md:px-16 px-5">
      <div className="navbar-start">
        <div
          onClick={() => setShowNavItems((preState) => !showNavItems)}
          className="dropdown"
        >
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {showNavItems && (
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          )}
        </div>
        <NavLink to="/home" className="btn btn-ghost normal-case text-xl">
          Dent Care
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
    </nav>
  );
};

export default NavBar;
