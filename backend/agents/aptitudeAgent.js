const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateAptitudeQuiz = async (topic = 'quantitative') => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Generate 5 ${topic} aptitude MCQ questions for placement exams. Return JSON:
[{
  "question": "...",
  "options": ["A", "B", "C", "D"],
  "correct": "A",
  "explanation": "..."
}]`;
  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json|```/g, '').trim();
  return JSON.parse(text);
};

const scoreAptitude = (questions, userAnswers) => {
  let correct = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.correct) correct++;
  });
  return Math.round((correct / questions.length) * 100);
};

module.exports = { generateAptitudeQuiz, scoreAptitude };