export function JobFormStep3({ formData, updateFormData }) {
  const contractTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Internship", "Freelance"]

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700">
          Work Location <span className="text-red-500">*</span>
        </label>
        <input
          id="location"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-[#4a90e2] focus:outline-none focus:ring-1 focus:ring-[#4a90e2]"
          placeholder="e.g. Paris, France or Remote"
          value={formData.location}
          onChange={(e) => updateFormData({ location: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="contractType" className="mb-1 block text-sm font-medium text-gray-700">
          Contract Type <span className="text-red-500">*</span>
        </label>
        <select
          id="contractType"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4a90e2] focus:outline-none focus:ring-1 focus:ring-[#4a90e2]"
          value={formData.contractType}
          onChange={(e) => updateFormData({ contractType: e.target.value })}
          required
        >
          {contractTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="salaryRange" className="mb-1 block text-sm font-medium text-gray-700">
          Salary Range (optional)
        </label>
        <input
          id="salaryRange"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-[#4a90e2] focus:outline-none focus:ring-1 focus:ring-[#4a90e2]"
          placeholder="e.g. $50,000 - $70,000"
          value={formData.salaryRange}
          onChange={(e) => updateFormData({ salaryRange: e.target.value })}
        />
      </div>
    </div>
  )
}

