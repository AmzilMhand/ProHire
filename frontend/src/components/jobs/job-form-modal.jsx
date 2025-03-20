import { useState } from "react"
import { JobFormStep1 } from "./job-form-step1"
import { JobFormStep2 } from "./job-form-step2"
import { JobFormStep3 } from "./job-form-step3"
import { JobFormStep4 } from "./job-form-step4"
import { JobFormReview } from "./job-form-review"

export function JobFormModal({ open, onClose, onSubmit, initialData }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      department: "",
      experienceLevel: "",
      skills: [],
      location: "",
      contractType: "Full-time",
      salaryRange: "",
      description: "",
    },
  )

  const totalSteps = 5
  const isLastStep = step === totalSteps
  const isFirstStep = step === 1
  const isEditMode = !!initialData

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data })
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleClose = () => {
    onClose()
    setStep(1)
    if (!initialData) {
      setFormData({
        title: "",
        department: "",
        experienceLevel: "",
        skills: [],
        location: "",
        contractType: "Full-time",
        salaryRange: "",
        description: "",
      })
    }
  }

  const generateDescription = () => {
    // In a real app, this would call your AI API to generate a description
    // For now, we'll just create a sample description based on the form data
    const description = `
We are looking for a ${formData.experienceLevel} ${formData.title} to join our ${formData.department} team. 

The ideal candidate will have experience with ${formData.skills.join(", ")}. 

This is a ${formData.contractType} position located in ${formData.location}.
${formData.salaryRange ? `Salary range: ${formData.salaryRange}` : ""}

As a ${formData.title}, you will be responsible for designing, developing, and implementing solutions that meet our business needs. You will work closely with cross-functional teams to deliver high-quality products.

Requirements:
- ${formData.experienceLevel} experience
- Proficiency in ${formData.skills.slice(0, 2).join(" and ")}
- Strong problem-solving skills
- Excellent communication and teamwork abilities

Benefits:
- Competitive salary
- Health insurance
- Flexible working hours
- Professional development opportunities
    `.trim()

    updateFormData({ description })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{isEditMode ? "Edit Job" : "Create New Job"}</h2>
            <p className="text-sm text-gray-500">
              {isLastStep
                ? "Review your job listing before submitting"
                : `Step ${step} of ${totalSteps - 1}: Fill in the job details`}
            </p>
          </div>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            onClick={handleClose}
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="relative">
          {/* Progress bar */}
          <div className="h-1 w-full bg-gray-100">
            <div
              className="h-full bg-[#4a90e2] transition-all duration-300 ease-in-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>

          <div className="px-6 py-4">
            {step === 1 && <JobFormStep1 formData={formData} updateFormData={updateFormData} />}
            {step === 2 && <JobFormStep2 formData={formData} updateFormData={updateFormData} />}
            {step === 3 && <JobFormStep3 formData={formData} updateFormData={updateFormData} />}
            {step === 4 && (
              <JobFormStep4
                formData={formData}
                updateFormData={updateFormData}
                generateDescription={generateDescription}
              />
            )}
            {step === 5 && <JobFormReview formData={formData} />}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <div>
            {!isFirstStep && (
              <button
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a90e2] focus-visible:ring-offset-2"
                onClick={handleBack}
              >
                Back
              </button>
            )}
          </div>
          <div>
            {isLastStep ? (
              <button
                className="rounded-md bg-[#4a90e2] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a7bc8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a90e2] focus-visible:ring-offset-2"
                onClick={handleSubmit}
              >
                {isEditMode ? "Update Job" : "Create Job"}
              </button>
            ) : (
              <button
                className="rounded-md bg-[#4a90e2] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a7bc8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a90e2] focus-visible:ring-offset-2"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

