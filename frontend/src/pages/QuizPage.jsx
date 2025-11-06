import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/QuizPage.css';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get('/api/quiz');
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setLoading(false);
    }
  };

  const handleAnswer = (optionIndex) => {
    setSelectedAnswer(optionIndex);
  };

  const handleSubmit = () => {
    setShowResult(true);
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      // Save quiz completion
      const quizzesTaken = parseInt(localStorage.getItem('quizzesTaken') || '0');
      localStorage.setItem('quizzesTaken', (quizzesTaken + 1).toString());
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (loading) {
    return <div className="loading">Loading quiz...</div>;
  }

  if (questions.length === 0) {
    return <div className="error">No quiz questions available</div>;
  }

  if (quizComplete) {
    const percentage = ((score / questions.length) * 100).toFixed(0);
    return (
      <div className="quiz-page">
        <div className="quiz-complete">
          <h1>Quiz Complete!</h1>
          <div className="score-display">
            <div className="score-number">{percentage}%</div>
            <div className="score-text">
              You got {score} out of {questions.length} questions correct
            </div>
          </div>

          <div className="performance-message">
            {percentage >= 80 && (
              <p className="success">
                Excellent work! You have a strong understanding of the material.
              </p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="good">
                Good job! Review the topics you missed to strengthen your knowledge.
              </p>
            )}
            {percentage < 60 && (
              <p className="needs-work">
                Keep studying! Review the proofs and use the AI tutor for help.
              </p>
            )}
          </div>

          <div className="quiz-actions">
            <button onClick={restartQuiz} className="restart-btn">
              Take Quiz Again
            </button>
            <button onClick={() => window.location.href = '/'} className="dashboard-btn">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1>Practice Quiz</h1>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`
            }}
          />
        </div>
        <div className="question-counter">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="question-card">
        <h2 className="question-text">{question.question}</h2>

        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option ${
                selectedAnswer === index ? 'selected' : ''
              } ${
                showResult
                  ? index === question.correct
                    ? 'correct'
                    : selectedAnswer === index
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="explanation">
            <h3>Explanation</h3>
            <p>{question.explanation}</p>
          </div>
        )}

        <div className="quiz-controls">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="submit-btn"
            >
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} className="next-btn">
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>

      <div className="score-tracker">
        Current Score: {score} / {currentQuestion + (showResult ? 1 : 0)}
      </div>
    </div>
  );
}

export default QuizPage;
