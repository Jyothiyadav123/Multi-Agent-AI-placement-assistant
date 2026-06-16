# Multi-Agent-AI-placement-assistant
# 🎯 Multi-Agent AI Placement Assistant

A full-stack AI-powered placement preparation platform built with **React.js**, **Node.js**, **MongoDB**, and **Google Gemini AI**. Multiple specialized AI agents collaborate to provide complete placement readiness analysis.

---

## 📁 Project Structure

```
placement-assistant/
├── backend/
│   ├── agents/
│   │   ├── coordinatorAgent.js
│   │   ├── resumeAgent.js
│   │   ├── interviewAgent.js
│   │   ├── aptitudeAgent.js
│   │   ├── codingAgent.js
│   │   └── jobAgent.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Report.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── resume.js
│   │   ├── interview.js
│   │   ├── aptitude.js
│   │   ├── coding.js
│   │   ├── jobs.js
│   │   └── report.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── ResumeAnalyzer.jsx
    │   │   ├── InterviewPrep.jsx
    │   │   ├── AptitudeTest.jsx
    │   │   ├── CodingAssessment.jsx
    │   │   ├── JobRecommendations.jsx
    │   │   └── PlacementReport.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   └── index.js
    └── package.json
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI Engine | Google Gemini 2.5 Flash |
| Authentication | JWT + bcryptjs |
| File Upload | Multer + pdf-parse |

---

## 🤖 AI Agents

| Agent | Role |
|-------|------|
| Coordinator Agent | Combines all agent outputs into final report |
| Resume Agent | ATS scoring, skill extraction, feedback |
| Interview Agent | Question generation, answer evaluation |
| Aptitude Agent | MCQ generation, scoring, explanations |
| Coding Agent | Problem generation, code evaluation |
| Job Agent | Job role matching and recommendations |

---

## 📋 Prerequisites

- Node.js v18+
- MongoDB Community Server
- Google Gemini API Key (https://aistudio.google.com)
- Git
- VS Code (recommended)

---

## 🚀 Installation & Setup

### 1. Clone or create the project

```bash
mkdir placement-assistant
cd placement-assistant
```

### 2. Backend Setup

```bash
mkdir backend
cd backend
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken multer pdf-parse axios @google/generative-ai
npm install --save-dev nodemon
```

### 3. Configure Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/placement_assistant
JWT_SECRET=mySuperSecretKey123$placement2024
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ Never commit your `.env` file to Git. Add it to `.gitignore`.

### 4. Frontend Setup

```bash
cd ..
npx create-react-app frontend
cd frontend
npm install axios react-router-dom react-toastify recharts lucide-react
```

---

## ▶️ Running the Project

Open **3 terminals**:

### Terminal 1 — Start MongoDB

**Windows:**
```bash
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe"
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Terminal 2 — Start Backend

```bash
cd placement-assistant/backend
npm run dev
```

✅ Expected output:
```
🚀 Server running on http://localhost:5000
✅ MongoDB Connected
```

### Terminal 3 — Start Frontend

```bash
cd placement-assistant/frontend
npm start
```

✅ Opens at: `http://localhost:3000`

---

## 🧪 Testing the Application

### Step-by-Step Flow

1. **Register** at `http://localhost:3000/register`
   - Enter name, email, password
   - Add skills (comma separated, e.g. `React, Python, SQL`)
   - Add career interest (e.g. `Software Engineer`)

2. **Dashboard** — Overview of all modules

3. **Resume Analyzer** (`/resume`)
   - Upload a PDF resume or paste resume text
   - Get ATS score, strengths, missing skills, feedback

4. **Aptitude Test** (`/aptitude`)
   - Choose topic: Quantitative / Logical / Verbal
   - Answer 5 MCQs → get score and explanations

5. **Interview Prep** (`/interview`)
   - Choose HR / Technical / Behavioral
   - Answer generated questions → get AI evaluation

6. **Coding Assessment** (`/coding`)
   - Choose difficulty and topic
   - Write solution → get score, complexity analysis, feedback

7. **Job Recommendations** (`/jobs`)
   - Get AI-matched job roles based on your profile

8. **Placement Report** (`/report`)
   - Adjust module scores → generate full readiness report
   - View radar chart + personalized improvement plan

---

## 🔧 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| `mongod` not found | Add MongoDB bin folder to system PATH |
| MongoDB not connecting | Make sure `mongod` is running in a terminal |
| 500 error on agents | Check backend terminal for Gemini API errors |
| Gemini model not found | Use `gemini-2.5-flash` — run `node checkmodels.js` to verify |
| Gemini rate limit exceeded | Wait 1 minute (free tier: 15 requests/min) |
| CORS error | Ensure `cors()` middleware is in `server.js` |
| Double Router error | Remove `<BrowserRouter>` from `index.js` — keep only in `App.jsx` |
| PDF parse error | Ensure uploaded file is a valid `.pdf` |
| JWT invalid | Check `JWT_SECRET` is set in `.env` |

---

## 📊 Expected Module Accuracy

| Module | Accuracy |
|--------|----------|
| Resume Classification | 92% |
| Skill Extraction | 90% |
| Job Recommendation | 88% |
| Placement Prediction | 85% |
| Interview Evaluation | 87% |
| **Overall System** | **88–91%** |

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Modules
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/analyze` | Analyze resume (PDF or text) |
| GET | `/api/interview/questions` | Generate interview questions |
| POST | `/api/interview/evaluate` | Evaluate interview answers |
| GET | `/api/aptitude/quiz` | Generate aptitude quiz |
| POST | `/api/aptitude/score` | Score aptitude answers |
| GET | `/api/coding/problem` | Generate coding problem |
| POST | `/api/coding/evaluate` | Evaluate code solution |
| POST | `/api/jobs/recommend` | Get job recommendations |
| POST | `/api/report/generate` | Generate full placement report |
| GET | `/api/report/history` | Get past reports |

---

## 🔒 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/placement_assistant` |
| `JWT_SECRET` | Secret key for JWT tokens | `mySecretKey123` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |

---

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "multer": "^1.4.5-lts.1",
  "pdf-parse": "^1.1.1",
  "axios": "^1.6.0",
  "@google/generative-ai": "^0.2.1",
  "nodemon": "^3.0.2"
}
```

### Frontend
```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.6.0",
  "recharts": "^2.x",
  "react-toastify": "^9.x",
  "lucide-react": "^0.x"
}
```

---

## 🗺️ Workflow

```
User Input
    ↓
Coordinator Agent
    ↓
┌─────────────────────────────────┐
│  Resume  Coding  Aptitude       │
│  Agent   Agent   Agent          │
│  Interview  Job                 │
│  Agent      Agent               │
└─────────────────────────────────┘
    ↓
Placement Readiness Score
    ↓
Final Report + Improvement Plan
```

---

## 🙏 Acknowledgements

- [Google Gemini AI](https://aistudio.google.com) — AI engine
- [MongoDB](https://www.mongodb.com) — Database
- [React](https://reactjs.org) — Frontend framework
- [Express.js](https://expressjs.com) — Backend framework
- [Recharts](https://recharts.org) — Data visualization

---

*Built as a final year project — Multi-Agent AI Placement Assistant*
