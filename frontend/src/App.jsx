import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import InterviewPrep from './pages/InterviewPrep';
import AptitudeTest from './pages/AptitudeTest';
import CodingAssessment from './pages/CodingAssessment';
import JobRecommendations from './pages/JobRecommendations';
import PlacementReport from './pages/PlacementReport';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/resume" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
          <Route path="/interview" element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
          <Route path="/aptitude" element={<ProtectedRoute><AptitudeTest /></ProtectedRoute>} />
          <Route path="/coding" element={<ProtectedRoute><CodingAssessment /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute><JobRecommendations /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><PlacementReport /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}