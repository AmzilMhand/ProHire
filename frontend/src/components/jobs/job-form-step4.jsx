export function JobFormStep4({ formData, updateFormData, generateDescription }) {
  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:ring-offset-2"
            onClick={generateDescription}
          >
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
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 1.9.6 2.7"></path>
              <path d="M9 18c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5"></path>
              <path d="M9 22v-6"></path>
              <path d="M9 16h6"></path>
            </svg>
            Generate
          </button>
        </div>
        <textarea
          id="description"
          className="block min-h-[200px] max-h-[300px] w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-[#4a90e2] focus:outline-none focus:ring-1 focus:ring-[#4a90e2] overflow-y-auto resize-y"
          placeholder="Enter job description or click Generate to create one automatically"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Provide a detailed description of the job responsibilities, requirements, and benefits. Or click the Generate
          button to create a description automatically based on the information provided.
        </p>
      </div>
    </div>
  )
}
