import { useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

export default function PlacementReport() {
  const { user } = useAuth();
  const [scores, setScores] = useState({ codingScore: 70, aptitudeScore: 75, interviewScore: 65 });
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const { data } = await API.post('/report/generate', {
      resumeText: `${user.name} is a developer with skills: ${user.skills?.join(', ')}`,
      skills: user.skills,
      careerInterest: user.careerInterest,
      ...scores
    });
    setReport(data);
    setLoading(false);
  };

  const chartData = report ? [
    { subject: 'Resume', score: report.resumeScore },
    { subject: 'Coding', score: report.codingScore },
    { subject: 'Aptitude', score: report.aptitudeScore },
    { subject: 'Interview', score: report.interviewScore },
    { subject: 'Job Match', score: report.jobMatchScore },
  ] : [];

  return (
    <div className="page-container">
      <h2>📊 Placement Readiness Report</h2>
      <div className="card">
        <p>Enter your module scores to generate the full report:</p>
        {['codingScore', 'aptitudeScore', 'interviewScore'].map(key => (
          <div key={key}>
            <label>{key.replace('Score', ' Score')}: {scores[key]}%</label>
            <input type="range" min="0" max="100" value={scores[key]}
              onChange={e => setScores({...scores, [key]: +e.target.value})} />
          </div>
        ))}
        <button className="btn-primary" onClick={generate} disabled={loading}>
          {loading ? '⏳ Generating...' : '🤖 Generate Full Report'}
        </button>
      </div>
      {report && (
        <div>
          <div className="readiness-score">{report.placementReadiness}%</div>
          <h2>Overall Placement Readiness</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar dataKey="score" fill="#6c63ff" fillOpacity={0.5} stroke="#6c63ff" />
            </RadarChart>
          </ResponsiveContainer>
          <div className="card">
            <h3>📈 Improvement Plan</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{report.improvementPlan}</pre>
          </div>
          <div className="card">
            <h3>💼 Recommended Jobs</h3>
            <ul>{report.jobRecommendations?.map((j, i) => <li key={i}>{j}</li>)}</ul>
          </div>
        </div>
      )}
    </div>
  );
}