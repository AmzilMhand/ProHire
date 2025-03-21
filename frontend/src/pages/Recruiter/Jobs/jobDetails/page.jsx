"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the job from your API
    // For demo purposes, we'll use mock data
    const mockJobs = [
      {
        id: "1",
        title: "Senior Frontend Developer",
        department: "Engineering",
        experienceLevel: "Senior (5+ years)",
        skills: ["React", "TypeScript", "CSS", "HTML", "Redux", "Jest", "Webpack"],
        location: "Remote",
        contractType: "Full-time",
        salaryRange: "$90,000 - $120,000",
        description:
          "We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications. The ideal candidate has strong experience with React, TypeScript, and modern frontend development practices.\n\nResponsibilities:\n• Develop new user-facing features using React.js\n• Build reusable components and front-end libraries for future use\n• Translate designs and wireframes into high-quality code\n• Optimize components for maximum performance across a vast array of web-capable devices and browsers\n\nRequirements:\n• 5+ years of experience in frontend development\n• Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model\n• Thorough understanding of React.js and its core principles\n• Experience with popular React.js workflows (such as Redux)\n• Familiarity with newer specifications of ECMAScript\n• Experience with data structure libraries (e.g., Immutable.js)\n• Knowledge of isomorphic React is a plus\n• Understanding of RESTful APIs and GraphQL\n• Knowledge of modern authorization mechanisms, such as JSON Web Token\n• Familiarity with modern front-end build pipelines and tools\n• Experience with common front-end development tools such as Babel, Webpack, NPM, etc.\n• Ability to understand business requirements and translate them into technical requirements",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "UX/UI Designer",
        department: "Design",
        experienceLevel: "Mid-level (2-5 years)",
        skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Sketch", "InVision"],
        location: "Paris, France",
        contractType: "Full-time",
        salaryRange: "$70,000 - $90,000",
        description:
          "We're seeking a talented UX/UI Designer to create beautiful, functional interfaces for our products. You'll work closely with product managers and engineers to design intuitive user experiences.\n\nResponsibilities:\n• Create user-centered designs by understanding business requirements, user feedback, and user research\n• Create user flows, wireframes, prototypes, and mockups\n• Translate requirements into style guides, design systems, design patterns, and attractive user interfaces\n• Design UI elements such as input controls, navigational components, and informational components\n• Create original graphic designs (e.g., images, sketches, and tables)\n• Identify and troubleshoot UX problems (e.g., responsiveness)\n• Conduct layout adjustments based on user feedback\n• Adhere to style standards on fonts, colors, and images\n\nRequirements:\n• 2-5 years of experience as a UI/UX Designer or similar role\n• Portfolio of design projects\n• Knowledge of wireframe tools (e.g., Wireframe.cc and InVision)\n• Up-to-date knowledge of design software like Adobe Illustrator and Photoshop\n• Team spirit; strong communication skills to collaborate with various stakeholders\n• Good time-management skills\n• BS/MS in Design, Computer Science, or relevant field",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ]

    const foundJob = mockJobs.find((j) => j.id === id)

    setTimeout(() => {
      if (foundJob) {
        setJob(foundJob)
      } else {
        navigate("/jobs")
      }
      setLoading(false)
    }, 500) // Simulate loading
  }, [id, navigate])

  const handleEdit = () => {
    navigate(`/jobs/${id}/edit`)
  }

  const handleDelete = () => {
    // In a real app, you would make an API call to delete the job
    navigate("/jobs")
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-600"
            onClick={() => navigate("/jobs")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{job.title}</h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>Posted on {formatDate(job.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 self-start sm:self-center">
          <button
            className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={handleEdit}
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
            onClick={() => setShowDeleteDialog(true)}
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

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Are you sure?</h2>
            <p className="mt-2 text-sm text-gray-500">
              This will permanently delete the job listing for "{job.title}". This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                onClick={handleDelete}
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

export default JobDetails

