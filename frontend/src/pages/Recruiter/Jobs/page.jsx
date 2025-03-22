import { useState, useEffect } from "react";
import { JobCard } from "../../../components/jobs/job-card";
import { JobFormModal } from "../../../components/jobs/job-form-modal";
import jobAPI from "../../../services/jobAPI";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const jobsData = await jobAPI.getRecruiterJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleCreateJob = async (jobData) => {
    try {
      const response = await jobAPI.createJob(jobData);
      setJobs([response, ...jobs]);
      setIsFormOpen(false);
      alert("Job created successfully!");
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to create job. Please try again.");
    }
  };

  const handleEditJob = (jobId) => {
    const job = jobs.find((job) => job._id === jobId);
    if (job) {
      setEditingJob(job);
      setIsFormOpen(true);
    }
  };

  const handleUpdateJob = async (updatedJob) => {
    try {
      const result = await jobAPI.updateJob(updatedJob._id, updatedJob);
      setJobs(jobs.map((job) => (job._id === result._id ? result : job)));
      setIsFormOpen(false);
      alert("Job updated successfully!");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job. Please try again.");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await jobAPI.deleteJob(jobId);
      setJobs(jobs.filter((job) => job._id !== jobId));
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
        <button
          className="inline-flex items-center justify-center rounded-md bg-[#4a90e2] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a7bc8]"
          onClick={() => {
            setEditingJob(null);
            setIsFormOpen(true);
          }}
        >
          Create Job
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <h3 className="text-lg font-medium">Loading...</h3>
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12">
          <h3 className="text-lg font-medium">No jobs found</h3>
          <button
            className="mt-4 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setIsFormOpen(true)}
          >
            Create Job
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={() => handleEditJob(job._id)}
              onDelete={() => handleDeleteJob(job._id)}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <JobFormModal
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
          initialData={editingJob}
        />
      )}
    </div>
  );
};

export default JobsPage;