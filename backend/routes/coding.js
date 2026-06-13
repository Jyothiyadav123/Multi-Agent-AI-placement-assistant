const router = require('express').Router();
const auth = require('../middleware/auth');
const { generateCodingProblem, evaluateCode } = require('../agents/codingAgent');

router.get('/problem', auth, async (req, res) => {
  try {
    const { difficulty, topic } = req.query;
    const problem = await generateCodingProblem(difficulty, topic);
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/evaluate', auth, async (req, res) => {
  try {
    const { problem, code, language } = req.body;
    const result = await evaluateCode(problem, code, language);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;