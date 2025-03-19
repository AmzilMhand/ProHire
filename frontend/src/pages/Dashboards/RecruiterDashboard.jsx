// RecruiterDashboard.jsx
import React, { useState } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiUsers,
  FiBarChart2,
  FiMessageSquare,
  FiSearch,
  FiSettings,
  FiChevronLeft,
  FiLogOut,
} from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";

import { useAuth } from '../../context/AuthContext';
import LogoutButton from "../../components/LogoutButton";
import "./Dashboard.css";

const RecruiterDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { path: "/recruiter/dashboard", name: "Dashboard", icon: <FiHome /> },
    { path: "/recruiter/jobs", name: "Jobs", icon: <FiBriefcase /> },
    { path: "/recruiter/candidates", name: "Candidates", icon: <FiUsers /> },
    { path: "/recruiter/analytics", name: "Analytics", icon: <FiBarChart2 /> },
    {
      path: "/recruiter/messages",
      name: "Messages",
      icon: <FiMessageSquare />,
    },
  ];

  return (
    <div
      className={`dashboard-container recruiter-dashboard ${
        isCollapsed ? "collapsed" : ""
      }`}
    >
      <aside className="sidebar">
        <div className="sidebar-header">
          <button
            className="collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <FiChevronLeft />
          </button>
          <Link to="/">
            <h2 className="logo">ProHire</h2>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              className="nav-item"
              onClick={(e) => {
                e.stopPropagation();

                if (isCollapsed) setIsCollapsed(true);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search jobs, candidates..." />
          </div>

          <div
            className="profile-section"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img
              src={user?.picture || '/profile-avatar.png'}
              alt="Profile"
              className="profile-pic"
            />
            <div className="profile-name-role">

            <span>{user?.name || 'User'}</span>
            <span className="user-role">{user?.role || 'User'}</span>
            </div>
            <MdKeyboardArrowDown />

            {showProfileMenu && (
              <div className="profile-menu">
                <Link to="/recruiter/settings" className="menu-item">
                  <FiSettings /> Settings
                </Link>
                <LogoutButton />
              </div>
            )}
          </div>
        </header>

        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
