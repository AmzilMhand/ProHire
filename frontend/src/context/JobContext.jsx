import React, { createContext, useContext, useState } from 'react';
import jobAPI from '../services/jobAPI';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobAPI.getAllJobs();
      setJobs(data);
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobContext.Provider value={{ jobs, loading, error, fetchJobs }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);