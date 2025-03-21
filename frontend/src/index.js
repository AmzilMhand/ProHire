import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/tailwind.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <JobProvider>
    <App />
  </JobProvider>
</AuthProvider>
);


