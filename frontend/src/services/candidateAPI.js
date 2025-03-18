import axios from 'axios';
import { API_URL } from './api';

const candidateAPI = {
  searchJobs: async (filters) => {
    const response = await axios.get(`${API_URL}/api/jobs`, { params: filters });
    return response.data;
  },

  applyForJob: async (jobId, applicationData) => {
    const response = await axios.post(`${API_URL}/api/jobs/${jobId}/apply`, applicationData);
    return response.data;
  },

  getApplications: async () => {
    const response = await axios.get(`${API_URL}/api/candidate/applications`);
    return response.data;
  },

  saveJob: async (jobId) => {
    const response = await axios.post(`${API_URL}/api/candidate/saved-jobs`, { jobId });
    return response.data;
  },

  getSavedJobs: async () => {
    const response = await axios.get(`${API_URL}/api/candidate/saved-jobs`);
    return response.data;
  },
};

export default candidateAPI;