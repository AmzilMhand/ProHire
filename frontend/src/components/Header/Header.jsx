import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

import "./Header.css";

export default function Header() {
  const [dropLogin, setDropLogin] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If dropdown is open and the clicked target is outside, close it
      if (dropLogin && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropLogin(false);
      }
    };

    // Attach event listener to the entire document
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropLogin]);

  return (
    <div className="header">
      <div className="logo">
        <h1>ProHire</h1>
      </div>
      <div className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/jobs" className="nav-link">
          Jobs
        </NavLink>
        <NavLink to="/contact" className="nav-link">
          Contact
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
      </div>
      <div className='buttons' ref={dropdownRef}>
        <button
          className="login-button"
          onClick={() => setDropLogin(!dropLogin)}
        >
          Login <IoIosArrowDown />
        </button>
        <div className={`dropmenu ${dropLogin ? "active" : ""}`}>
          
            <Link to={"/recruiter/auth"}>As an Recruiter</Link>
            <Link to={"/candidate/auth"}>As an Candidate</Link>
          
        </div>
        <button className="register-button">Sign Up</button>
      </div>
    </div>
  );
}
