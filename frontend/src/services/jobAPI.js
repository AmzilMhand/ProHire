import api from './api';

const jobAPI = {
  getJobDetails: async (jobId) => {
    const response = await api.get(`/api/jobs/${jobId}`);
    return response.data;
  },

  getCompanyProfile: async (companyId) => {
    const response = await api.get(`/api/companies/${companyId}`);
    return response.data;
  },

  getAllJobs: async () => {
    const response = await api.get('/api/jobs');
    return response.data;
  },
};

export default jobAPI;