const router = require('express').Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const { analyzeResume } = require('../agents/resumeAgent');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', auth, upload.single('resume'), async (req, res) => {
  try {
    const { skills, careerInterest } = req.body;
    let resumeText = '';

    if (req.file) {
      try {
        const pdfParse = require('pdf-parse');
        const data = await pdfParse(req.file.buffer);
        resumeText = data.text;
      } catch (pdfErr) {
        console.error('PDF parse error:', pdfErr.message);
        // fallback: use filename as resume text
        resumeText = `Resume uploaded by candidate. Skills: ${skills}. Target role: ${careerInterest}`;
      }
    } else if (req.body.resumeText) {
      resumeText = req.body.resumeText;
    } else {
      return res.status(400).json({ message: 'No resume provided' });
    }

    console.log('Resume text extracted, length:', resumeText.length);
    const result = await analyzeResume(resumeText, JSON.parse(skills), careerInterest);
    res.json(result);

  } catch (err) {
    console.error('Resume analyze error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;