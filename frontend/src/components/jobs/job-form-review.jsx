export function JobFormReview({ formData }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Job Details</h3>
        <div className="my-2 h-px w-full bg-gray-200"></div>
        <dl className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Title:</dt>
            <dd className="col-span-2 text-sm text-gray-900">{formData.title || "Not specified"}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Department:</dt>
            <dd className="col-span-2 text-sm text-gray-900">{formData.department || "Not specified"}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Experience Level:</dt>
            <dd className="col-span-2 text-sm text-gray-900">{formData.experienceLevel || "Not specified"}</dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Skills</h3>
        <div className="my-2 h-px w-full bg-gray-200"></div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.skills && formData.skills.length > 0 ? (
            formData.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">No skills specified</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Location & Contract</h3>
        <div className="my-2 h-px w-full bg-gray-200"></div>
        <dl className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Location:</dt>
            <dd className="col-span-2 text-sm text-gray-900">{formData.location || "Not specified"}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Contract Type:</dt>
            <dd className="col-span-2 text-sm text-gray-900">{formData.contractType || "Not specified"}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Salary Range:</dt>
            <dd className="col-span-2 text-sm text-gray-900">{formData.salaryRange || "Not specified"}</dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Job Description</h3>
        <div className="my-2 h-px w-full bg-gray-200"></div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm text-gray-900 whitespace-pre-line">
            {formData.description || "No description provided"}
          </p>
        </div>
      </div>
    </div>
  )
}

