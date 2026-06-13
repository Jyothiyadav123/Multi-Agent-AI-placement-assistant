const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resumeScore: Number,
  codingScore: Number,
  aptitudeScore: Number,
  interviewScore: Number,
  jobMatchScore: Number,
  placementReadiness: Number,
  resumeFeedback: String,
  codingFeedback: String,
  aptitudeFeedback: String,
  interviewFeedback: String,
  jobRecommendations: [String],
  improvementPlan: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);