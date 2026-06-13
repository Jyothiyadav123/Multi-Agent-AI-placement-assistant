const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeResume = async (resumeText, skills, careerInterest) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an expert ATS Resume Analyzer. Analyze this resume and provide:
1. ATS Score (0-100)
2. Key strengths (3 points)
3. Missing skills for ${careerInterest} role
4. Specific improvement suggestions
5. Overall feedback

Resume Text:
${resumeText}

Candidate Skills: ${skills.join(', ')}
Target Role: ${careerInterest}

IMPORTANT: Respond ONLY in valid JSON format with no extra text, no markdown, no backticks:
{
  "score": 75,
  "strengths": ["strength1", "strength2", "strength3"],
  "missingSkills": ["skill1", "skill2"],
  "improvements": ["improvement1", "improvement2"],
  "feedback": "overall feedback here"
}`;

  const result = await model.generateContent(prompt);
  let text = result.response.text();
  
  // clean any markdown formatting
  text = text.replace(/```json/g, '').replace(/```/g, '').trim();
  
  // extract JSON if wrapped in extra text
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  return JSON.parse(text);
};

module.exports = { analyzeResume };