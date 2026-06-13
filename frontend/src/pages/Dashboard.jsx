import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  const modules = [
    { icon: '📄', title: 'Resume Analyzer', desc: 'ATS score & feedback', path: '/resume', color: '#6c63ff' },
    { icon: '💻', title: 'Coding Assessment', desc: 'Practice & evaluate code', path: '/coding', color: '#ff6584' },
    { icon: '🧮', title: 'Aptitude Test', desc: 'Quantitative & logical', path: '/aptitude', color: '#43c6ac' },
    { icon: '🎤', title: 'Interview Prep', desc: 'Mock interview & feedback', path: '/interview', color: '#f7971e' },
    { icon: '💼', title: 'Job Recommendations', desc: 'Matched job roles', path: '/jobs', color: '#4facfe' },
    { icon: '📊', title: 'Placement Report', desc: 'Full readiness analysis', path: '/report', color: '#a18cd1' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}! 👋</h1>
        <p>Target: <strong>{user?.careerInterest}</strong> | Skills: <strong>{user?.skills?.join(', ')}</strong></p>
      </div>
      <div className="module-grid">
        {modules.map((m) => (
          <Link to={m.path} key={m.path} className="module-card" style={{ borderTop: `4px solid ${m.color}` }}>
            <div className="module-icon">{m.icon}</div>
            <h3>{m.title}</h3>
            <p>{m.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}