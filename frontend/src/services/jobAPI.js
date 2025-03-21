import api from './api';

const jobAPI = {
  // Get details for a specific job
  getJobDetails: async (jobId) => {
    const response = await api.get(`/api/jobs/${jobId}`);
    return response.data.data;
  },

  // Get all jobs (for job seekers)
  getAllJobs: async () => {
    const response = await api.get('/api/jobs');
    return response.data.data;
  },

  // Get recruiter's own jobs
  getRecruiterJobs: async () => {
    const response = await api.get('/api/jobs/recruiter');
    return response.data.data;
  },

  // Create a new job
  createJob: async (jobData) => {
    const response = await api.post('/api/jobs', jobData);
    return response.data.data;
  },

  // Update a job
  updateJob: async (jobId, jobData) => {
    const response = await api.put(`/api/jobs/${jobId}`, jobData);
    return response.data.data;
  },

  // Delete a job
  deleteJob: async (jobId) => {
    const response = await api.delete(`/api/jobs/${jobId}`);
    return response.data.data;
  },

  // Original method kept for backward compatibility
  getCompanyProfile: async (companyId) => {
    const response = await api.get(`/api/companies/${companyId}`);
    return response.data;
  },
};

export default jobAPI;