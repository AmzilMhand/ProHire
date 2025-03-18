import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiBriefcase, 
  FiUsers, 
  FiBarChart, 
  FiMessageSquare,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiBell
} from 'react-icons/fi';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import './RecruiterSidebar.css';

const RecruiterSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/recruiter/dashboard', name: 'Dashboard', icon: <FiHome /> },
    { path: '/recruiter/jobs', name: 'Jobs', icon: <FiBriefcase /> },
    { path: '/recruiter/candidates', name: 'Candidates', icon: <FiUsers /> },
    { path: '/recruiter/analytics', name: 'Analytics', icon: <FiBarChart /> },
    { path: '/recruiter/messages', name: 'Messages', icon: <FiMessageSquare />, notification: 3 },
    { path: '/recruiter/settings', name: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <motion.div 
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="sidebar-header">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="branding"
          >
            <div className="logo-glow"></div>
            <h2 className="logo">ProHire</h2>
          </motion.div>
        )}
        <motion.button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </motion.button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <motion.div
            key={item.path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">
                {item.icon}
                {item.notification && (
                  <span className="notification-badge">{item.notification}</span>
                )}
              </span>
              {!isCollapsed && (
                <motion.span 
                  className="nav-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {item.name}
                </motion.span>
              )}
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <motion.div 
          className="user-profile"
          whileHover={{ scale: 1.02 }}
        >
          <div className="avatar-container">
            <div className="avatar-glow"></div>
            <img 
              src="/avatar.png" 
              alt="User" 
              className="user-avatar" 
            />
          </div>
          {!isCollapsed && (
            <div className="user-info">
              <h4 className="user-name">Jane Cooper</h4>
              <p className="user-role">Senior Recruiter</p>
            </div>
          )}
        </motion.div>
        
        <motion.button 
          className="logout-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RiLogoutCircleRLine />
          {!isCollapsed && <span>Log Out</span>}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RecruiterSidebar;