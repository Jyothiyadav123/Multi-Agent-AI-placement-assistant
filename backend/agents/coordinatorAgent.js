const { analyzeResume } = require('./resumeAgent');
const { recommendJobs } = require('./jobAgent');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateFullReport = async ({ resumeText, skills, careerInterest, codingScore, aptitudeScore, interviewScore }) => {
  const resumeResult = await analyzeResume(resumeText, skills, careerInterest);
  const jobResult = await recommendJobs(skills, careerInterest, resumeResult.score);

  const placementReadiness = Math.round(
    (resumeResult.score * 0.25) +
    (codingScore * 0.25) +
    (aptitudeScore * 0.20) +
    (interviewScore * 0.20) +
    (jobResult[0]?.match_score || 70) * 0.10
  );

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const planPrompt = `Student placement readiness: ${placementReadiness}%. Skills: ${skills.join(', ')}. Target: ${careerInterest}. 
Resume score: ${resumeResult.score}, Coding: ${codingScore}, Aptitude: ${aptitudeScore}, Interview: ${interviewScore}.
Create a 4-week personalized improvement plan. Be specific and actionable. Return as plain text.`;
  
  const planResult = await model.generateContent(planPrompt);
  const improvementPlan = planResult.response.text();

  return {
    resumeScore: resumeResult.score,
    resumeFeedback: resumeResult.feedback,
    codingScore,
    aptitudeScore,
    interviewScore,
    jobMatchScore: jobResult[0]?.match_score || 70,
    placementReadiness,
    jobRecommendations: jobResult.map(j => `${j.title} @ ${j.company_type} (${j.match_score}% match)`),
    improvementPlan
  };
};

module.exports = { generateFullReport };