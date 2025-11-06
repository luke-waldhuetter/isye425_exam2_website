import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProofViewer.css';

function ProofViewer() {
  const { id } = useParams();
  const [proof, setProof] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [mode, setMode] = useState('learn'); // 'learn' or 'practice'
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProof();
  }, [id]);

  const fetchProof = async () => {
    try {
      const response = await axios.get(`/api/proofs/${id}`);
      setProof(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching proof:', error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < proof.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePracticeSubmit = (step) => {
    const answer = userAnswers[step] || '';
    // For now, just mark as attempted
    // In real implementation, this would call the API to check the answer
    alert('Answer submitted! (API integration pending)');
  };

  const markAsMastered = () => {
    const progress = JSON.parse(localStorage.getItem('examProgress') || '{}');
    progress[id] = {
      ...progress[id],
      mastered: true,
      lastStudied: new Date().toISOString()
    };
    localStorage.setItem('examProgress', JSON.stringify(progress));
    alert('Marked as mastered!');
  };

  const trackAttempt = () => {
    const progress = JSON.parse(localStorage.getItem('examProgress') || '{}');
    progress[id] = {
      ...progress[id],
      attempts: (progress[id]?.attempts || 0) + 1,
      lastStudied: new Date().toISOString()
    };
    localStorage.setItem('examProgress', JSON.stringify(progress));
  };

  useEffect(() => {
    if (proof) {
      trackAttempt();
    }
  }, [proof]);

  if (loading) {
    return <div className="loading">Loading proof...</div>;
  }

  if (!proof) {
    return <div className="error">Proof not found</div>;
  }

  return (
    <div className="proof-viewer">
      <div className="proof-header-section">
        <Link to="/proofs" className="back-link">← Back to Library</Link>
        <h1>{proof.title}</h1>
        <div className="proof-meta">
          <span className="category">{proof.category}</span>
          <span className={`difficulty ${proof.difficulty.toLowerCase()}`}>
            {proof.difficulty}
          </span>
        </div>
      </div>

      <div className="theorem-box">
        <h3>Theorem Statement</h3>
        <p>{proof.theorem}</p>
      </div>

      <div className="mode-selector">
        <button
          className={mode === 'learn' ? 'active' : ''}
          onClick={() => setMode('learn')}
        >
          Learning Mode
        </button>
        <button
          className={mode === 'practice' ? 'active' : ''}
          onClick={() => setMode('practice')}
        >
          Practice Mode
        </button>
      </div>

      {mode === 'learn' && (
        <div className="learn-mode">
          <div className="controls">
            <button onClick={() => setShowAllSteps(!showAllSteps)}>
              {showAllSteps ? 'Hide Steps' : 'Show All Steps'}
            </button>
            <button onClick={markAsMastered} className="mastered-btn">
              Mark as Mastered
            </button>
          </div>

          {showAllSteps ? (
            <div className="all-steps">
              {proof.steps.map((step, index) => (
                <div key={step.step} className="proof-step">
                  <div className="step-number">Step {step.step}</div>
                  <div className="step-content">
                    <div className="step-text">{step.content}</div>
                    <div className="step-explanation">
                      <strong>Why?</strong> {step.explanation}
                    </div>
                    {step.keyTerm && (
                      <div className="key-term">
                        <strong>Key concept:</strong> {step.keyTerm}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="step-by-step">
              <div className="step-navigation">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  ← Previous
                </button>
                <span className="step-indicator">
                  Step {currentStep + 1} of {proof.steps.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentStep === proof.steps.length - 1}
                >
                  Next →
                </button>
              </div>

              <div className="current-step">
                <div className="step-number">
                  Step {proof.steps[currentStep].step}
                </div>
                <div className="step-content">
                  <div className="step-text">
                    {proof.steps[currentStep].content}
                  </div>
                  <div className="step-explanation">
                    <strong>Explanation:</strong>{' '}
                    {proof.steps[currentStep].explanation}
                  </div>
                  {proof.steps[currentStep].keyTerm && (
                    <div className="key-term">
                      <strong>Key concept:</strong>{' '}
                      {proof.steps[currentStep].keyTerm}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {mode === 'practice' && (
        <div className="practice-mode">
          <div className="practice-instructions">
            <h3>Practice Mode</h3>
            <p>
              Try to write each step of the proof yourself. Compare your answer
              with the correct one.
            </p>
          </div>

          <div className="practice-steps">
            {proof.steps.map((step, index) => (
              <div key={step.step} className="practice-step">
                <div className="practice-step-header">
                  <h4>Step {step.step}</h4>
                  <span className="hint">Hint: {step.explanation}</span>
                </div>

                <textarea
                  className="practice-input"
                  placeholder="Write your answer here..."
                  value={userAnswers[step.step] || ''}
                  onChange={(e) =>
                    setUserAnswers({
                      ...userAnswers,
                      [step.step]: e.target.value
                    })
                  }
                  rows={3}
                />

                <details className="answer-reveal">
                  <summary>Show Answer</summary>
                  <div className="correct-answer">
                    <strong>Correct answer:</strong>
                    <p>{step.content}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>

          <button className="complete-practice" onClick={markAsMastered}>
            I Can Write This Proof From Memory
          </button>
        </div>
      )}
    </div>
  );
}

export default ProofViewer;
