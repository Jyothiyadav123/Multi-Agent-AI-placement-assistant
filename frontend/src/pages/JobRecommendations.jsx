import { useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function JobRecommendations() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getJobs = async () => {
    setLoading(true);
    const { data } = await API.post('/jobs/recommend', {
      skills: user.skills, careerInterest: user.careerInterest, resumeScore: 75
    });
    setJobs(data);
    setLoading(false);
  };

  return (
    <div className="page-container">
      <h2>💼 Job Recommendations</h2>
      <button className="btn-primary" onClick={getJobs} disabled={loading}>
        {loading ? '⏳ Finding jobs...' : '🔍 Find Matching Jobs'}
      </button>
      <div className="job-grid">
        {jobs.map((job, i) => (
          <div className="job-card" key={i}>
            <h3>{job.title}</h3>
            <p>🏢 {job.company_type}</p>
            <div className="match-bar">
              <div className="match-fill" style={{ width: `${job.match_score}%` }}></div>
            </div>
            <p>{job.match_score}% Match</p>
            <p>💰 {job.salary_range}</p>
            <p>🔧 {job.required_skills?.join(', ')}</p>
            <p>📝 {job.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}