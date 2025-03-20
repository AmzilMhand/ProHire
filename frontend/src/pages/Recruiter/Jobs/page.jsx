import { useState } from "react"
import { JobCard } from "../../../components/jobs/job-card"
import { JobFormModal } from "../../../components/jobs/job-form-modal"

const initialJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    experienceLevel: "Senior (5+ years)",
    skills: ["React", "TypeScript", "CSS", "HTML"],
    location: "Remote",
    contractType: "Full-time",
    salaryRange: "$90,000 - $120,000",
    description:
      "We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications. The ideal candidate has strong experience with React, TypeScript, and modern frontend development practices.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "UX/UI Designer",
    department: "Design",
    experienceLevel: "Mid-level (2-5 years)",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    location: "Paris, France",
    contractType: "Full-time",
    salaryRange: "$70,000 - $90,000",
    description:
      "We're seeking a talented UX/UI Designer to create beautiful, functional interfaces for our products. You'll work closely with product managers and engineers to design intuitive user experiences.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    title: "UX/UI Designer",
    department: "Design",
    experienceLevel: "Mid-level (2-5 years)",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    location: "Paris, France",
    contractType: "Full-time",
    salaryRange: "$70,000 - $90,000",
    description:
      "We're seeking a talented UX/UI Designer to create beautiful, functional interfaces for our products. You'll work closely with product managers and engineers to design intuitive user experiences.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "4",
    title: "UX/UI Designer",
    department: "Design",
    experienceLevel: "Mid-level (2-5 years)",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    location: "Paris, France",
    contractType: "Full-time",
    salaryRange: "$70,000 - $90,000",
    description:
      "We're seeking a talented UX/UI Designer to create beautiful, functional interfaces for our products. You'll work closely with product managers and engineers to design intuitive user experiences.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "5",
    title: "UX/UI Designer",
    department: "Design",
    experienceLevel: "Mid-level (2-5 years)",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    location: "Paris, France",
    contractType: "Full-time",
    salaryRange: "$70,000 - $90,000",
    description:
      "We're seeking a talented UX/UI Designer to create beautiful, functional interfaces for our products. You'll work closely with product managers and engineers to design intuitive user experiences.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

export default function JobsPage() {
  const [jobs, setJobs] = useState(initialJobs)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingJob, setEditingJob] = useState(null)

  const handleCreateJob = (jobData) => {
    const newJob = {
      id: Date.now().toString(),
      ...jobData,
      createdAt: new Date().toISOString(),
    }

    setJobs([newJob, ...jobs])
    setIsFormOpen(false)

    // Show toast notification
    alert("Job created successfully!")
  }

  const handleEditJob = (jobId) => {
    const job = jobs.find((job) => job.id === jobId)
    if (job) {
      setEditingJob(job)
      setIsFormOpen(true)
    }
  }

  const handleUpdateJob = (updatedJob) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)))
    setIsFormOpen(false)
    setEditingJob(null)

    // Show toast notification
    alert("Job updated successfully!")
  }

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId))

    // Show toast notification
    alert("Job deleted successfully!")
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

      {jobs.length === 0 ? (
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
              key={job.id}
              job={job}
              onEdit={() => handleEditJob(job.id)}
              onDelete={() => handleDeleteJob(job.id)}
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

