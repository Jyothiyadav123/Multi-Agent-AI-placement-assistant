const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const evaluateInterview = async (role, answers) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an expert interview coach. Evaluate these interview answers for a ${role} position:

${answers.map((a, i) => `Q${i+1}: ${a.question}\nAnswer: ${a.answer}`).join('\n\n')}

Provide evaluation in JSON:
{
  "score": number (0-100),
  "feedback": "overall feedback",
  "questionFeedback": [{"question": "...", "rating": "Good/Average/Poor", "tip": "..."}],
  "improvements": ["..."]
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const json = text.replace(/```json|```/g, '').trim();
  return JSON.parse(json);
};

const generateQuestions = async (role, type = 'HR') => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Generate 5 ${type} interview questions for a ${role} position. Return JSON array: [{"question": "..."}]`;
  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json|```/g, '').trim();
  return JSON.parse(text);
};

module.exports = { evaluateInterview, generateQuestions };