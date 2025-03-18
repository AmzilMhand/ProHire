import axios from 'axios';
import { API_URL } from './api';

const recruiterAPI = {
  postJob: async (jobData) => {
    const response = await axios.post(`${API_URL}/api/recruiter/jobs`, jobData);
    return response.data;
  },

  getJobs: async () => {
    const response = await axios.get(`${API_URL}/api/recruiter/jobs`);
    return response.data;
  },

  getJobApplications: async (jobId) => {
    const response = await axios.get(`${API_URL}/api/recruiter/jobs/${jobId}/applications`);
    return response.data;
  },

  updateApplicationStatus: async (applicationId, status) => {
    const response = await axios.put(`${API_URL}/api/recruiter/applications/${applicationId}`, { status });
    return response.data;
  },

  getAnalytics: async () => {
    const response = await axios.get(`${API_URL}/api/recruiter/analytics`);
    return response.data;
  },
};

export default recruiterAPI;