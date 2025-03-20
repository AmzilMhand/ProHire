export function JobFormStep1({ formData, updateFormData }) {
  const departments = [
    "Engineering",
    "Design",
    "Product",
    "Marketing",
    "Sales",
    "Customer Support",
    "Human Resources",
    "Finance",
    "Operations",
    "Legal",
    "Other",
  ]

  const experienceLevels = [
    "Internship",
    "Entry-level (0-1 years)",
    "Junior (1-2 years)",
    "Mid-level (2-5 years)",
    "Senior (5+ years)",
    "Lead",
    "Manager",
    "Director",
    "Executive",
  ]

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-[#4a90e2] focus:outline-none focus:ring-1 focus:ring-[#4a90e2]"
          placeholder="e.g. Frontend Developer"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="department" className="mb-1 block text-sm font-medium text-gray-700">
          Department <span className="text-red-500">*</span>
        </label>
        <select
          id="department"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4a90e2] focus:outline-none focus:ring-1 focus:ring-[#4a90e2]"
          value={formData.department}
          onChange={(e) => updateFormData({ department: e.target.value })}
          required
        >
          <option value="" disabled>
            Select department
          </option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="experienceLevel" className="mb-1 block text-sm font-medium text-gray-700">
          Experience Level <span className="text-red-500">*</span>
        </label>
        <select
          id="experienceLevel"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4a90e2] focus:outline-none focus:ring-1 focus:ring-[#4a90e2]"
          value={formData.experienceLevel}
          onChange={(e) => updateFormData({ experienceLevel: e.target.value })}
          required
        >
          <option value="" disabled>
            Select experience level
          </option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

