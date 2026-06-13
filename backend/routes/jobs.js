const router = require('express').Router();
const auth = require('../middleware/auth');
const { recommendJobs } = require('../agents/jobAgent');

router.post('/recommend', auth, async (req, res) => {
  try {
    const { skills, careerInterest, resumeScore } = req.body;
    const jobs = await recommendJobs(skills, careerInterest, resumeScore);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;