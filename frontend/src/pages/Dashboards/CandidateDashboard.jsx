// CandidateDashboard.jsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiBell, 
  FiUser,
  FiBookmark,
  FiSearch,
  FiSettings,
  FiChevronLeft,
  FiLogOut
} from 'react-icons/fi';
import './Dashboard.css';
import { useAuth } from '../../context/AuthContext';
import { MdKeyboardArrowDown } from 'react-icons/md';
import LogoutButton from '../../components/LogoutButton';

const CandidateDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/candidate/dashboard', name: 'Dashboard', icon: <FiHome /> },
    { path: '/candidate/applications', name: 'Applications', icon: <FiBookmark /> },
    { path: '/candidate/alerts', name: 'Job Alerts', icon: <FiBell /> },
    { path: '/candidate/profile', name: 'My Profile', icon: <FiUser /> }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`dashboard-container candidate-dashboard ${isCollapsed ? 'collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
            <FiChevronLeft />
          </button>
          {!isCollapsed && <h2 className="logo">ProHire</h2>}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {!isCollapsed && <span className="nav-text">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search jobs, companies..." />
          </div>

          <div className="profile-section" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <img
              src={user?.picture || '/candidat-avatar.png'}
              alt="Profile"
              className="profile-pic"
            />
            <div className="profile-name-role">
              <span>{user?.name || 'User'}</span>
              <span className="user-role">{user?.role || 'User'}</span>
            </div>
            <MdKeyboardArrowDown/>
            {showProfileMenu && (
              <div className="profile-menu">
                <Link to="/candidate/settings" className="menu-item">
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

export default CandidateDashboard