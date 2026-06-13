import { useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function ResumeAnalyzer() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return alert('Please upload a resume PDF');
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('skills', JSON.stringify(user.skills));
    formData.append('careerInterest', user.careerInterest);
    try {
      const { data } = await API.post('/resume/analyze', formData);
      setResult(data);
    } catch (err) {
      alert('Analysis failed: ' + err.response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <h2>📄 Resume Analyzer</h2>
      <div className="card">
        <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} />
        <button className="btn-primary" onClick={handleAnalyze} disabled={loading}>
          {loading ? '⏳ Analyzing...' : '🔍 Analyze Resume'}
        </button>
      </div>
      {result && (
        <div className="result-card">
          <div className="score-circle">{result.score}%</div>
          <h3>ATS Score</h3>
          <h4>✅ Strengths</h4>
          <ul>{result.strengths?.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <h4>❌ Missing Skills</h4>
          <ul>{result.missingSkills?.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <h4>💡 Improvements</h4>
          <ul>{result.improvements?.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <h4>📝 Overall Feedback</h4>
          <p>{result.feedback}</p>
        </div>
      )}
    </div>
  );
}