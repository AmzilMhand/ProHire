import { useState, useEffect } from "react"
import { JobCard } from "../../../components/jobs/job-card"
import { JobFormModal } from "../../../components/jobs/job-form-modal"
import jobAPI from "../../../services/jobAPI"

const initialJobs = []

export default function JobsPage() {
  const [jobs, setJobs] = useState(initialJobs)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Use getRecruiterJobs instead of getAllJobs to get only the current recruiter's jobs
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
      // Call the API to create a job in the database
      const response = await jobAPI.createJob(jobData);
      
      // Update the local state with the new job from the API
      // The response.data contains the actual job data
      setJobs([response, ...jobs]);
      setIsFormOpen(false);

      // Show success notification
      alert("Job created successfully!");
    } catch (error) {
      console.error("Error creating job:", error.response?.data || error);
      alert(error.response?.data?.error || "Failed to create job. Please try again.");
    }
  }

  const handleEditJob = (jobId) => {
    const job = jobs.find((job) => job._id === jobId);
    if (job) {
      setEditingJob(job);
      setIsFormOpen(true);
    }
  }

  const handleUpdateJob = async (updatedJob) => {
    try {
      // Call the API to update the job in the database
      const result = await jobAPI.updateJob(updatedJob._id, updatedJob);
      
      // Update the local state with the updated job
      setJobs(jobs.map((job) => (job._id === result._id ? result : job)));
      setIsFormOpen(false);
      setEditingJob(null);

      // Show toast notification
      alert("Job updated successfully!");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job. Please try again.");
    }
  }

  const handleDeleteJob = async (jobId) => {
    try {
      // Call the API to delete the job from the database
      await jobAPI.deleteJob(jobId);
      
      // Update the local state by removing the deleted job
      setJobs(jobs.filter((job) => job._id !== jobId));

      // Show toast notification
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job. Please try again.");
    }
  }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
          <p className="text-gray-500">Create and manage job listings for your company</p>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md bg-[#4a90e2] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a7bc8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a90e2] focus-visible:ring-offset-2"
          onClick={() => {
            setEditingJob(null)
            setIsFormOpen(true)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Job
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
          <h3 className="text-lg font-medium">Loading...</h3>
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
          <h3 className="text-lg font-medium">No jobs found</h3>
          <p className="text-sm text-gray-500">Get started by creating a new job.</p>
          <button
            className="mt-4 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a90e2] focus-visible:ring-offset-2"
            onClick={() => setIsFormOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
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
  )
}
