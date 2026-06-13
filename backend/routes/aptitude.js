const router = require('express').Router();
const auth = require('../middleware/auth');
const { generateAptitudeQuiz, scoreAptitude } = require('../agents/aptitudeAgent');

router.get('/quiz', auth, async (req, res) => {
  try {
    const { topic } = req.query;
    const quiz = await generateAptitudeQuiz(topic);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/score', auth, (req, res) => {
  const { questions, userAnswers } = req.body;
  const score = scoreAptitude(questions, userAnswers);
  res.json({ score });
});

module.exports = router;