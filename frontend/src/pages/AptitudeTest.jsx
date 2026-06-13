import { useState } from 'react';
import API from '../api/axios';

export default function AptitudeTest() {
  const [topic, setTopic] = useState('quantitative');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadQuiz = async () => {
    setLoading(true);
    setScore(null);
    setAnswers({});
    const { data } = await API.get(`/aptitude/quiz?topic=${topic}`);
    setQuestions(data);
    setLoading(false);
  };

  const submitQuiz = async () => {
    const userAnswers = questions.map((_, i) => answers[i] || '');
    const { data } = await API.post('/aptitude/score', { questions, userAnswers });
    setScore(data.score);
  };

  return (
    <div className="page-container">
      <h2>🧮 Aptitude Test</h2>
      <div className="card">
        <select value={topic} onChange={e => setTopic(e.target.value)}>
          <option value="quantitative">Quantitative</option>
          <option value="logical reasoning">Logical Reasoning</option>
          <option value="verbal ability">Verbal Ability</option>
          <option value="data interpretation">Data Interpretation</option>
        </select>
        <button className="btn-primary" onClick={loadQuiz} disabled={loading}>
          {loading ? '⏳ Loading...' : '📝 Start Quiz'}
        </button>
      </div>
      {questions.map((q, i) => (
        <div className="card" key={i}>
          <p><strong>Q{i+1}: {q.question}</strong></p>
          {q.options.map((opt, j) => (
            <label key={j} className="option-label">
              <input type="radio" name={`q${i}`} value={opt}
                onChange={() => setAnswers({...answers, [i]: opt})} />
              {opt}
            </label>
          ))}
        </div>
      ))}
      {questions.length > 0 && !score && (
        <button className="btn-primary" onClick={submitQuiz}>📊 Submit & Score</button>
      )}
      {score !== null && (
        <div className="result-card">
          <div className="score-circle">{score}%</div>
          <h3>Aptitude Score</h3>
          {questions.map((q, i) => (
            <div key={i} className={answers[i] === q.correct ? 'correct' : 'wrong'}>
              <p>Q{i+1}: {q.question}</p>
              <p>Your answer: {answers[i]} | Correct: {q.correct}</p>
              <p>💡 {q.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}