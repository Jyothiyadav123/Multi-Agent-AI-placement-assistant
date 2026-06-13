const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const recommendJobs = async (skills, careerInterest, resumeScore) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Based on skills: ${skills.join(', ')}, career interest: ${careerInterest}, ATS score: ${resumeScore}, recommend 5 suitable job roles. Return JSON:
[{
  "title": "...",
  "company_type": "...",
  "match_score": number,
  "required_skills": ["..."],
  "salary_range": "...",
  "reason": "..."
}]`;
  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json|```/g, '').trim();
  return JSON.parse(text);
};

module.exports = { recommendJobs };