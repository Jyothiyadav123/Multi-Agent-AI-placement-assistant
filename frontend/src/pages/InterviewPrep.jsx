import { useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function InterviewPrep() {
  const { user } = useAuth();
  const [type, setType] = useState('HR');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadQuestions = async () => {
    setLoading(true);
    const { data } = await API.get(`/interview/questions?role=${user.careerInterest}&type=${type}`);
    setQuestions(data);
    setLoading(false);
  };

  const evaluate = async () => {
    const answersArr = questions.map(q => ({ question: q.question, answer: answers[q.question] || '' }));
    setLoading(true);
    const { data } = await API.post('/interview/evaluate', { role: user.careerInterest, answers: answersArr });
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="page-container">
      <h2>🎤 Interview Preparation</h2>
      <div className="card">
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="HR">HR Questions</option>
          <option value="Technical">Technical Questions</option>
          <option value="Behavioral">Behavioral Questions</option>
        </select>
        <button className="btn-primary" onClick={loadQuestions} disabled={loading}>
          {loading ? '⏳' : '🎯 Get Questions'}
        </button>
      </div>
      {questions.map((q, i) => (
        <div className="card" key={i}>
          <p><strong>Q{i+1}: {q.question}</strong></p>
          <textarea rows={3} placeholder="Your answer..."
            value={answers[q.question] || ''}
            onChange={e => setAnswers({...answers, [q.question]: e.target.value})} />
        </div>
      ))}
      {questions.length > 0 && !result && (
        <button className="btn-primary" onClick={evaluate} disabled={loading}>
          {loading ? '⏳ Evaluating...' : '🤖 Evaluate My Answers'}
        </button>
      )}
      {result && (
        <div className="result-card">
          <div className="score-circle">{result.score}%</div>
          <h3>Interview Score</h3>
          <p>{result.feedback}</p>
          {result.questionFeedback?.map((qf, i) => (
            <div key={i} className="card">
              <p><strong>{qf.question}</strong></p>
              <span className={`badge ${qf.rating.toLowerCase()}`}>{qf.rating}</span>
              <p>💡 {qf.tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}