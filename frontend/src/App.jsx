import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ProofLibrary from './pages/ProofLibrary';
import ProofViewer from './pages/ProofViewer';
import PracticeMode from './pages/PracticeMode';
import QuizPage from './pages/QuizPage';
import AITutor from './components/AITutor';
import './styles/App.css';

function App() {
  const [showTutor, setShowTutor] = useState(false);

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-content">
            <h1 className="logo">ISYE 425 Exam Prep</h1>
            <div className="nav-links">
              <Link to="/">Dashboard</Link>
              <Link to="/proofs">Proofs</Link>
              <Link to="/practice">Practice</Link>
              <Link to="/quiz">Quiz</Link>
            </div>
            <button
              className="tutor-button"
              onClick={() => setShowTutor(!showTutor)}
            >
              {showTutor ? 'Hide AI Tutor' : 'Ask AI Tutor'}
            </button>
          </div>
        </nav>

        <div className="main-container">
          <div className={`content ${showTutor ? 'with-tutor' : ''}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/proofs" element={<ProofLibrary />} />
              <Route path="/proofs/:id" element={<ProofViewer />} />
              <Route path="/practice" element={<PracticeMode />} />
              <Route path="/quiz" element={<QuizPage />} />
            </Routes>
          </div>

          {showTutor && (
            <div className="tutor-panel">
              <AITutor onClose={() => setShowTutor(false)} />
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
