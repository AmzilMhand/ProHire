import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = ({ className }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Force navigation to home page
    window.location.href = '/';
  };

  return (
    <button className={className || "menu-item menu-logout"} onClick={handleLogout}>
      <FiLogOut /> Logout
    </button>
  );
};

export default LogoutButton;
