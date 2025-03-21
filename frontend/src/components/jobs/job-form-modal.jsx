import { useState } from "react"
import { JobFormStep1 } from "./job-form-step1"
import { JobFormStep2 } from "./job-form-step2"
import { JobFormStep3 } from "./job-form-step3"
import { JobFormStep4 } from "./job-form-step4"
import { JobFormReview } from "./job-form-review"
import api from '../../services/api';

// Configure axios with base URL
const API_URL = 'http://localhost:5050';  // Backend runs on port 5050

console.log('API URL configured as:', API_URL);

export function JobFormModal({ open, onClose, onSubmit, initialData }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      company: "",
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
        company: "",
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

  const generateDescription = async () => {
    try {
      // Validate required fields before making the API call
      if (!formData.title || !formData.company || !formData.department || 
          !formData.experienceLevel || !formData.skills || !formData.location || 
          !formData.contractType) {
        console.error('Missing required fields');
        alert('Please fill in all required fields before generating description');
        return;
      }

      console.log('Generating description with data:', formData);
      console.log('Making request to:', `${API_URL}/api/ai/generate-description`);
      console.log('Request method:', 'POST');
      
      // Show loading state to user
      updateFormData({ description: "Generating description..." });
      
      // Test the API endpoint first
      try {
        const testResponse = await api.get('/api/ai/test');
        console.log('Test endpoint response:', testResponse.data);
      } catch (testError) {
        console.error('Test endpoint failed:', testError);
        throw new Error('Cannot connect to AI service - test endpoint failed');
      }
      
      const response = await api.post('/api/ai/generate-description', {
        title: formData.title,
        company: formData.company,
        department: formData.department,
        experienceLevel: formData.experienceLevel,
        skills: formData.skills,
        location: formData.location,
        contractType: formData.contractType,
        salaryRange: formData.salaryRange
      });

      console.log('API Response:', response.data);

      if (response.data && response.data.success && response.data.description) {
        updateFormData({ description: response.data.description });
        if (response.data.note) {
          alert(response.data.note); // Show any notes from the backend
        }
      } else {
        console.error('Invalid response from API:', response.data);
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error generating description:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      
      let errorMessage = 'Failed to generate description. ';
      
      if (error.response?.data?.error) {
        // Use the specific error message from the backend
        errorMessage += error.response.data.error;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage += 'Request timed out. The AI service is taking too long to respond. ';
      } else if (error.message.includes('Network Error')) {
        errorMessage += `Cannot connect to the backend server at ${API_URL}. Please ensure the server is running. `;
      } else if (!error.response) {
        errorMessage += `Network error. Please ensure the backend server is running at ${API_URL}. `;
      }
      
      if (error.response?.data?.details && process.env.NODE_ENV === 'development') {
        console.error('Error details:', error.response.data.details);
      }
      
      errorMessage += ' Falling back to basic description template.';
      alert(errorMessage);
      
      // Clear the "Generating description..." message before falling back
      fallbackToBasicDescription();
    }
  };

  // Simple fallback in case the API fails
  const fallbackToBasicDescription = () => {
    // Clear the description field or set to empty
    updateFormData({ description: "" });
  };

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

          <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
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