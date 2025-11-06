import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProofs: 0,
    masteredProofs: 0,
    inProgressProofs: 0,
    quizzesTaken: 0
  });

  const [proofs, setProofs] = useState([]);

  useEffect(() => {
    fetchProofs();
    loadProgress();
  }, []);

  const fetchProofs = async () => {
    try {
      const response = await axios.get('/api/proofs');
      setProofs(response.data);
      setStats(prev => ({ ...prev, totalProofs: response.data.length }));
    } catch (error) {
      console.error('Error fetching proofs:', error);
    }
  };

  const loadProgress = () => {
    const progress = JSON.parse(localStorage.getItem('examProgress') || '{}');
    const mastered = Object.values(progress).filter(p => p.mastered).length;
    const inProgress = Object.values(progress).filter(p => p.attempts > 0 && !p.mastered).length;
    const quizzes = parseInt(localStorage.getItem('quizzesTaken') || '0');

    setStats(prev => ({
      ...prev,
      masteredProofs: mastered,
      inProgressProofs: inProgress,
      quizzesTaken: quizzes
    }));
  };

  const examProofs = [
    { id: "prop-2-10-part1", title: "Proposition 2.10 (part 1)" },
    { id: "prop-2-10-part2", title: "Proposition 2.10 (part 2)" },
    { id: "theorem-2-11", title: "Theorem 2.11" },
    { id: "prop-2-16", title: "Proposition 2.16" },
    { id: "theorem-2-17", title: "Theorem 2.17" },
    { id: "theorem-2-18", title: "Theorem 2.18" },
    { id: "prop-2-19", title: "Proposition 2.19" },
    { id: "dijkstra-correctness", title: "Theorem (validity of Dijkstra algorithm)" },
    { id: "theorem-2-20", title: "Theorem 2.20" },
    { id: "prop-2-21", title: "Proposition 2.21" },
    { id: "prop-3-1", title: "Proposition 3.1" }
  ];

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Welcome to Your Exam Prep Dashboard</h1>
        <p className="exam-info">
          Prepare for your ISYE 425 Midterm 2 with interactive proof learning,
          AI tutoring, and practice problems.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalProofs}</div>
          <div className="stat-label">Total Proofs</div>
        </div>
        <div className="stat-card mastered">
          <div className="stat-number">{stats.masteredProofs}</div>
          <div className="stat-label">Mastered</div>
        </div>
        <div className="stat-card in-progress">
          <div className="stat-number">{stats.inProgressProofs}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.quizzesTaken}</div>
          <div className="stat-label">Quizzes Taken</div>
        </div>
      </div>

      <div className="exam-requirements">
        <h2>Required Proofs for Exam 2</h2>
        <p className="requirements-note">
          <strong>Important:</strong> You must be able to write every step of these proofs
          on a blank sheet of paper without looking at any material!
        </p>
        <div className="proof-checklist">
          {examProofs.map(proof => {
            const progress = JSON.parse(localStorage.getItem('examProgress') || '{}');
            const proofProgress = progress[proof.id] || {};
            const status = proofProgress.mastered ? 'mastered' :
                          proofProgress.attempts > 0 ? 'in-progress' : 'not-started';

            return (
              <Link
                key={proof.id}
                to={`/proofs/${proof.id}`}
                className={`proof-checklist-item ${status}`}
              >
                <div className="proof-status-indicator">
                  {status === 'mastered' && '✓'}
                  {status === 'in-progress' && '○'}
                  {status === 'not-started' && '−'}
                </div>
                <div className="proof-title">{proof.title}</div>
                <div className="proof-attempts">
                  {proofProgress.attempts > 0 && `${proofProgress.attempts} attempts`}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-grid">
          <Link to="/proofs" className="action-card">
            <div className="action-icon">📚</div>
            <h3>Browse All Proofs</h3>
            <p>View and study all available proofs with step-by-step explanations</p>
          </Link>

          <Link to="/practice" className="action-card">
            <div className="action-icon">✍️</div>
            <h3>Practice Mode</h3>
            <p>Test yourself by writing proofs step-by-step</p>
          </Link>

          <Link to="/quiz" className="action-card">
            <div className="action-icon">🎯</div>
            <h3>Take a Quiz</h3>
            <p>Test your understanding with practice questions</p>
          </Link>
        </div>
      </div>

      <div className="study-tips">
        <h2>Exam Preparation Tips</h2>
        <ul>
          <li>
            <strong>Learn proofs thoroughly:</strong> Being able to recall every step
            from memory is crucial
          </li>
          <li>
            <strong>Understand, don't memorize:</strong> Focus on the logical flow and
            key insights
          </li>
          <li>
            <strong>Practice regularly:</strong> Use the practice mode to test your
            recall without looking
          </li>
          <li>
            <strong>Master definitions:</strong> Precise language is essential for the exam
          </li>
          <li>
            <strong>Review Assignment 3:</strong> Solutions provide valuable examples
          </li>
          <li>
            <strong>Use the AI tutor:</strong> Ask questions when you're stuck on a concept
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
