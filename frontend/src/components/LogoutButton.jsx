import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = ({ className }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Force navigation to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error, still redirect to home page
      window.location.href = '/';
    }
  };

  return (
    <button className={className || "menu-item menu-logout"} onClick={handleLogout}>
      <FiLogOut /> Logout
    </button>
  );
};

export default LogoutButton;
