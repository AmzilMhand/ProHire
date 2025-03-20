import { useState } from "react"

export function JobFormStep2({ formData, updateFormData }) {
  const [skillInput, setSkillInput] = useState("")

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      const updatedSkills = [...formData.skills, skillInput.trim()]
      updateFormData({ skills: updatedSkills })
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove) => {
    const updatedSkills = formData.skills.filter((skill) => skill !== skillToRemove)
    updateFormData({ skills: updatedSkills })
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="skills" className="mb-1 block text-sm font-medium text-gray-700">
          Required Skills <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-2">
          <input
            id="skills"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-[#4a90e2] focus:outline-none focus:ring-1 focus:ring-[#4a90e2]"
            placeholder="e.g. React"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#4a90e2] text-white hover:bg-[#3a7bc8] focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:ring-offset-2"
            onClick={addSkill}
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
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500">Press Enter or click the plus button to add a skill</p>
      </div>

      <div>
        {formData.skills.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full bg-blue-50 pl-2 pr-1 py-1 text-xs font-medium text-blue-700"
              >
                {skill}
                <button
                  type="button"
                  className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-blue-700 hover:bg-blue-200 hover:text-blue-900 focus:outline-none"
                  onClick={() => removeSkill(skill)}
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
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No skills added yet</p>
        )}
      </div>
    </div>
  )
}

