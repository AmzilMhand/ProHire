import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

export default function Header() {
  const { user} = useAuth();
  const [dropLogin, setDropLogin] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropLogin && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropLogin(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropLogin]);

  const handleAccountClick = () => {
    if (user?.role === 'recruiter') {
      navigate('/recruiter/dashboard');
    } else if (user?.role === 'candidate') {
      navigate('/candidate/dashboard');
    }
  };

  return (
    <div className="header">
      <div className="logo">
        <h1>ProHire</h1>
      </div>
      <div className="nav-links">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/jobs" className="nav-link">Jobs</NavLink>
        <NavLink to="/contact" className="nav-link">Contact</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
      </div>
      
      {user ? (
        <div className="account-section">
          <button className="account-button" onClick={handleAccountClick}>
            My Account ({user.role})
          </button>
        </div>
      ) : (
        <div className='buttons' ref={dropdownRef}>
          <button className="login-button" onClick={() => setDropLogin(!dropLogin)}>
            Login <IoIosArrowDown />
          </button>
          <div className={`dropmenu ${dropLogin ? "active" : ""}`}>
            <Link to="/recruiter/auth">As a Recruiter</Link>
            <Link to="/candidate/auth">As a Candidate</Link>
          </div>
          <button className="register-button">Sign Up</button>
        </div>
      )}
    </div>
  );
}