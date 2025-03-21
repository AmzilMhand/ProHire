import { useState, useEffect } from "react"
import { JobFormModal } from "../../../../components/jobs/job-form-modal"
import { useNavigate, useParams } from "react-router-dom"
import jobAPI from "../../../../services/jobAPI"

export default function JobDetailPage() {
  const [job, setJob] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const { id } = useParams();
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobData = await jobAPI.getJobDetails(id);
        setJob(jobData);
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
      // Call the API to update the job in the database
      const result = await jobAPI.updateJob(id, updatedJob);
      setJob(result);
      setIsFormOpen(false);

      alert("Job updated successfully!");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job. Please try again.");
    }
  }

  const handleDeleteJob = async () => {
    try {
      // Call the API to delete the job from the database
      await jobAPI.deleteJob(id);
      navigate("/recruiter/jobs");

      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job. Please try again.");
    }
  }

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
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#4a90e2]"></div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return `${Math.floor(diffDays / 30)} months ago`;
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => (navigate("/recruiter/jobs"))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
          <div className="flex items-center text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Posted {formatDate(job.createdAt)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:ring-offset-2"
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
              className="mr-1.5"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit
          </button>
          <button
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => setShowDeleteDialog(true)}
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
              className="mr-1.5"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Delete
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 md:items-center">
        <div className="flex items-center text-sm">
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
            className="mr-2 text-gray-500"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>
            {job.department} • {job.experienceLevel}
          </span>
        </div>
        <div className="flex items-center text-sm">
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
            className="mr-2 text-gray-500"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>
            {job.location} • {job.contractType}
          </span>
        </div>
        {job.salaryRange && (
          <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            {job.salaryRange}
          </span>
        )}
      </div>

      <div className="h-px w-full bg-gray-200"></div>

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
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="p-4">
              <h3 className="mb-3 font-medium">Required Skills</h3>
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

          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="p-4">
              <h3 className="mb-3 font-medium">Job Details</h3>
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

      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Are you sure?</h2>
            <p className="mt-2 text-sm text-gray-500">
              This will permanently delete the job listing for "{job.title}". This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a90e2] focus-visible:ring-offset-2"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={() => {
                  handleDeleteJob()
                  setShowDeleteDialog(false)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
