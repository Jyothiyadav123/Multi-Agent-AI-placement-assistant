const router = require('express').Router();
const auth = require('../middleware/auth');
const { evaluateInterview, generateQuestions } = require('../agents/interviewAgent');

router.get('/questions', auth, async (req, res) => {
  try {
    const { role, type } = req.query;
    const questions = await generateQuestions(role, type);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/evaluate', auth, async (req, res) => {
  try {
    const { role, answers } = req.body;
    const result = await evaluateInterview(role, answers);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;