import { useState } from 'react';
import API from '../api/axios';

export default function CodingAssessment() {
  const [config, setConfig] = useState({ difficulty: 'medium', topic: 'arrays' });
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProblem = async () => {
    setLoading(true);
    setResult(null);
    const { data } = await API.get(`/coding/problem?difficulty=${config.difficulty}&topic=${config.topic}`);
    setProblem(data);
    setCode('');
    setLoading(false);
  };

  const submitCode = async () => {
    setLoading(true);
    const { data } = await API.post('/coding/evaluate', { problem, code, language });
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="page-container">
      <h2>💻 Coding Assessment</h2>
      <div className="card flex-row">
        <select value={config.difficulty} onChange={e => setConfig({...config, difficulty: e.target.value})}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select value={config.topic} onChange={e => setConfig({...config, topic: e.target.value})}>
          <option value="arrays">Arrays</option>
          <option value="strings">Strings</option>
          <option value="dynamic programming">Dynamic Programming</option>
          <option value="trees">Trees</option>
          <option value="graphs">Graphs</option>
        </select>
        <button className="btn-primary" onClick={loadProblem} disabled={loading}>
          {loading ? '⏳' : '🎲 New Problem'}
        </button>
      </div>
      {problem && (
        <>
          <div className="card">
            <h3>{problem.title}</h3>
            <p>{problem.description}</p>
            <h4>Examples:</h4>
            {problem.examples?.map((ex, i) => (
              <pre key={i}>Input: {ex.input} → Output: {ex.output}</pre>
            ))}
            <p><strong>Constraints:</strong> {problem.constraints}</p>
            <p>💡 <em>Hint: {problem.hint}</em></p>
          </div>
          <div className="card">
            <select value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            <textarea rows={12} placeholder="Write your solution here..."
              value={code} onChange={e => setCode(e.target.value)}
              className="code-editor" />
            <button className="btn-primary" onClick={submitCode} disabled={loading}>
              {loading ? '⏳ Evaluating...' : '🚀 Submit Code'}
            </button>
          </div>
        </>
      )}
      {result && (
        <div className="result-card">
          <div className="score-circle">{result.score}%</div>
          <p>Correctness: <strong>{result.correctness}</strong></p>
          <p>Time Complexity: <strong>{result.timeComplexity}</strong></p>
          <p>Space Complexity: <strong>{result.spaceComplexity}</strong></p>
          <p>{result.feedback}</p>
          <h4>💡 Optimized Approach:</h4>
          <p>{result.optimizedApproach}</p>
        </div>
      )}
    </div>
  );
}