import { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  FiPlus,
  FiEdit,
  FiTrash,
  FiDollarSign,
  FiMapPin,
  FiCalendar
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const JobsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth(); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    deadline: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/jobs');
      setJobs(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to load jobs');
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const jobData = {
        ...formData,
        salary: Number(formData.salary), // Convert to number
        deadline: new Date(formData.deadline).toISOString(), // Convert to ISO format
        recruiter: user.id // Add recruiter ID from your auth context
      };
  
      if (editMode) {
        await api.put(`/jobs/${currentJobId}`, jobData);
      } else {
        await api.post('/jobs', jobData);
      }
      
      setShowModal(false);
      await fetchJobs(); // Add await here
      resetForm();
    } catch (error) {
      console.error('Error saving job:', error);
      // Add error notification to user
      alert(error.response?.data?.message || 'Failed to save job');
    }
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      location: job.location,
      salary: job.salary,
      deadline: job.deadline.split('T')[0], 
    });
    setEditMode(true);
    setCurrentJobId(job._id);
    setShowModal(true);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.delete(`/jobs/${jobId}`);
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      requirements: '',
      location: '',
      salary: '',
      deadline: '',
    });
    setEditMode(false);
    setCurrentJobId(null);
  };

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h2>Job Postings</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Post New Job
        </button>
      </div>

      {/* Jobs List */}
      <div className="jobs-list">
        {jobs.map(job => (
          <div className="job-card" key={job._id}>
            <div className="job-card-header">
              <h3>{job.title}</h3>
              <div className="job-actions">
                <button className="btn-icon" onClick={() => handleEdit(job)}>
                  <FiEdit />
                </button>
                <button className="btn-icon danger" onClick={() => handleDelete(job._id)}>
                  <FiTrash />
                </button>
              </div>
            </div>
            <div className="job-details">
              <p><FiDollarSign /> {job.salary}</p>
              <p><FiMapPin /> {job.location}</p>
              <p><FiCalendar /> {new Date(job.deadline).toLocaleDateString()}</p>
            </div>
            <div className="job-description">
              <h4>Description</h4>
              <p>{job.description}</p>
              <h4>Requirements</h4>
              <p>{job.requirements}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editMode ? 'Edit Job' : 'Add New Job'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Requirements:</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Salary:</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Deadline:</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}>
                  Cancel
                </button>
                <button type="submit">
                  {editMode ? 'Update Job' : 'Create Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;