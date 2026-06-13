const router = require('express').Router();
const auth = require('../middleware/auth');
const { generateFullReport } = require('../agents/coordinatorAgent');
const Report = require('../models/Report');

router.post('/generate', auth, async (req, res) => {
  try {
    const report = await generateFullReport(req.body);
    const saved = await Report.create({ userId: req.user.id, ...report });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/history', auth, async (req, res) => {
  const reports = await Report.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(reports);
});

module.exports = router;