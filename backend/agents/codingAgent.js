const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateCodingProblem = async (difficulty = 'medium', topic = 'arrays') => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Generate a ${difficulty} coding problem on ${topic} for placement prep. Return JSON:
{
  "title": "...",
  "description": "...",
  "examples": [{"input": "...", "output": "..."}],
  "constraints": "...",
  "hint": "..."
}`;
  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json|```/g, '').trim();
  return JSON.parse(text);
};

const evaluateCode = async (problem, code, language) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Evaluate this ${language} code for the problem: "${problem.title}"

Code:
${code}

Return JSON:
{
  "score": number (0-100),
  "correctness": "correct/partial/incorrect",
  "timeComplexity": "O(...)",
  "spaceComplexity": "O(...)",
  "feedback": "...",
  "optimizedApproach": "..."
}`;
  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json|```/g, '').trim();
  return JSON.parse(text);
};

module.exports = { generateCodingProblem, evaluateCode };