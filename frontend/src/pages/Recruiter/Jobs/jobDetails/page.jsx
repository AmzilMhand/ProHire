import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobAPI from "../../../../services/jobAPI";
import { JobFormModal } from "../../../../components/jobs/job-form-modal";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobData = await jobAPI.getJobDetails(id);
        if (jobData) {
          setJob(jobData);
        } else {
          navigate("/recruiter/jobs");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        navigate("/recruiter/jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  const handleUpdateJob = async (updatedJob) => {
    try {
      const result = await jobAPI.updateJob(id, updatedJob);
      setJob(result);
      setIsFormOpen(false);
      alert("Job updated successfully!");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job. Please try again.");
    }
  };

  const handleDeleteJob = async () => {
    try {
      await jobAPI.deleteJob(id);
      navigate("/recruiter/jobs");
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#4a90e2]"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-gray-500">Job not found. Redirecting...</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-600"
            onClick={() => navigate("/recruiter/jobs")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{job.title}</h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>Posted on {formatDate(job.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 self-start sm:self-center">
          <button
            className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setIsFormOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>Edit</span>
          </button>
          <button
            className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            onClick={handleDeleteJob}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">{job.department}</span>
        <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">{job.experienceLevel}</span>
        <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">{job.location}</span>
        <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">{job.contractType}</span>
        {job.salaryRange && (
          <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">{job.salaryRange}</span>
        )}
      </div>

      <hr className="border-gray-200" />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Job Description</h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{job.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-4 py-3">
              <h3 className="font-semibold">Required Skills</h3>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-4 py-3">
              <h3 className="font-semibold">Job Details</h3>
            </div>
            <div className="p-4">
              <dl className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <dt className="text-sm font-medium text-gray-500">Department:</dt>
                  <dd className="text-sm">{job.department}</dd>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <dt className="text-sm font-medium text-gray-500">Experience:</dt>
                  <dd className="text-sm">{job.experienceLevel}</dd>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <dt className="text-sm font-medium text-gray-500">Location:</dt>
                  <dd className="text-sm">{job.location}</dd>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <dt className="text-sm font-medium text-gray-500">Contract:</dt>
                  <dd className="text-sm">{job.contractType}</dd>
                </div>
                {job.salaryRange && (
                  <div className="grid grid-cols-2 gap-1">
                    <dt className="text-sm font-medium text-gray-500">Salary:</dt>
                    <dd className="text-sm">{job.salaryRange}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <JobFormModal
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleUpdateJob}
          initialData={job}
        />
      )}
    </div>
  );
};

export default JobDetails;