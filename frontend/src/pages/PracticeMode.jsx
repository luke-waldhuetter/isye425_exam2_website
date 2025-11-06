import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/PracticeMode.css';

function PracticeMode() {
  const [selectedProof, setSelectedProof] = useState('');
  const [mode, setMode] = useState('select'); // 'select', 'flashcards', 'blank-recall'
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [blankProofText, setBlankProofText] = useState('');
  const [generatedProblem, setGeneratedProblem] = useState('');
  const [generating, setGenerating] = useState(false);

  const examProofs = [
    { id: "prop-2-10-part1", title: "Proposition 2.10 (part 1)" },
    { id: "prop-2-10-part2", title: "Proposition 2.10 (part 2)" },
    { id: "theorem-2-11", title: "Theorem 2.11 (Bellman-Ford)" },
    { id: "prop-2-16", title: "Proposition 2.16 (DAG Property)" },
    { id: "theorem-2-17", title: "Theorem 2.17 (Topological Sort Exists)" },
    { id: "theorem-2-18", title: "Theorem 2.18 (Topological Sort Algorithm)" },
    { id: "prop-2-19", title: "Proposition 2.19 (DAG Shortest Paths)" },
    { id: "dijkstra-correctness", title: "Dijkstra's Algorithm Correctness" },
    { id: "theorem-2-20", title: "Theorem 2.20 (Max-Flow Min-Cut)" },
    { id: "prop-2-21", title: "Proposition 2.21 (Flow Integrality)" },
    { id: "prop-3-1", title: "Proposition 3.1 (Flow Decomposition)" }
  ];

  const definitions = [
    {
      term: "Shortest Path",
      definition: "A path from s to t where the sum of edge lengths is minimized"
    },
    {
      term: "Negative Cycle",
      definition: "A cycle where the sum of edge lengths is negative"
    },
    {
      term: "DAG",
      definition: "Directed Acyclic Graph - a directed graph with no cycles"
    },
    {
      term: "Topological Ordering",
      definition: "An ordering of vertices where all edges go from earlier to later vertices"
    },
    {
      term: "In-degree",
      definition: "Number of incoming edges to a vertex"
    },
    {
      term: "Residual Graph",
      definition: "Graph showing remaining capacities after flow is sent"
    },
    {
      term: "Augmenting Path",
      definition: "A path from s to t in the residual graph"
    },
    {
      term: "s-t Cut",
      definition: "A partition of vertices into sets S and T where s ∈ S and t ∈ T"
    },
    {
      term: "Flow Conservation",
      definition: "At each vertex except s and t, incoming flow equals outgoing flow"
    },
    {
      term: "Capacity Constraint",
      definition: "Flow on each edge cannot exceed its capacity"
    }
  ];

  const handleGenerateProblem = async (topic) => {
    setGenerating(true);
    try {
      const response = await axios.post('/api/practice/generate', {
        topic: topic,
        difficulty: 'medium'
      });
      setGeneratedProblem(response.data.problem);
    } catch (error) {
      console.error('Error generating problem:', error);
      alert('Error generating problem. Make sure the OpenAI API key is configured.');
    } finally {
      setGenerating(false);
    }
  };

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCard((currentCard + 1) % definitions.length);
  };

  const handlePreviousCard = () => {
    setShowAnswer(false);
    setCurrentCard((currentCard - 1 + definitions.length) % definitions.length);
  };

  return (
    <div className="practice-mode">
      <h1>Practice & Study Tools</h1>
      <p className="subtitle">
        Multiple ways to test your knowledge and prepare for the exam
      </p>

      <div className="practice-options">
        <div className="practice-card" onClick={() => setMode('flashcards')}>
          <div className="practice-icon">🎴</div>
          <h3>Flashcards</h3>
          <p>Review key definitions and concepts</p>
        </div>

        <div className="practice-card" onClick={() => setMode('blank-recall')}>
          <div className="practice-icon">📝</div>
          <h3>Blank Sheet Practice</h3>
          <p>Write proofs from memory</p>
        </div>

        <div className="practice-card" onClick={() => setMode('generate')}>
          <div className="practice-icon">🤖</div>
          <h3>AI-Generated Problems</h3>
          <p>Get custom practice problems</p>
        </div>

        <Link to="/proofs" className="practice-card">
          <div className="practice-icon">📚</div>
          <h3>Interactive Proofs</h3>
          <p>Step-by-step proof learning</p>
        </Link>
      </div>

      {mode === 'flashcards' && (
        <div className="flashcard-mode">
          <h2>Definition Flashcards</h2>
          <div className="flashcard-container">
            <div className={`flashcard ${showAnswer ? 'flipped' : ''}`}>
              <div className="flashcard-front">
                <h3>Define:</h3>
                <p className="term">{definitions[currentCard].term}</p>
                <button
                  className="flip-btn"
                  onClick={() => setShowAnswer(true)}
                >
                  Show Definition
                </button>
              </div>
              <div className="flashcard-back">
                <h3>{definitions[currentCard].term}</h3>
                <p className="definition">{definitions[currentCard].definition}</p>
                <button
                  className="flip-btn"
                  onClick={() => setShowAnswer(false)}
                >
                  Hide Definition
                </button>
              </div>
            </div>
          </div>

          <div className="flashcard-controls">
            <button onClick={handlePreviousCard}>← Previous</button>
            <span className="card-counter">
              {currentCard + 1} / {definitions.length}
            </span>
            <button onClick={handleNextCard}>Next →</button>
          </div>

          <button className="back-btn" onClick={() => setMode('select')}>
            Back to Practice Options
          </button>
        </div>
      )}

      {mode === 'blank-recall' && (
        <div className="blank-recall-mode">
          <h2>Blank Sheet Practice</h2>
          <p className="instructions">
            This simulates the exam environment. Select a proof and try to write
            it completely from memory on a blank sheet of paper (or in the text area below).
          </p>

          <div className="proof-selector">
            <label>Select a proof to practice:</label>
            <select
              value={selectedProof}
              onChange={(e) => setSelectedProof(e.target.value)}
            >
              <option value="">Choose a proof...</option>
              {examProofs.map(proof => (
                <option key={proof.id} value={proof.id}>
                  {proof.title}
                </option>
              ))}
            </select>
          </div>

          {selectedProof && (
            <>
              <div className="writing-area">
                <textarea
                  value={blankProofText}
                  onChange={(e) => setBlankProofText(e.target.value)}
                  placeholder="Write the proof here from memory..."
                  rows={20}
                />
              </div>

              <div className="practice-actions">
                <Link
                  to={`/proofs/${selectedProof}`}
                  className="check-btn"
                >
                  Check Against Correct Proof
                </Link>
                <button
                  onClick={() => setBlankProofText('')}
                  className="clear-btn"
                >
                  Clear
                </button>
              </div>
            </>
          )}

          <button className="back-btn" onClick={() => setMode('select')}>
            Back to Practice Options
          </button>
        </div>
      )}

      {mode === 'generate' && (
        <div className="generate-mode">
          <h2>AI-Generated Practice Problems</h2>
          <p className="instructions">
            Get custom-generated practice problems on specific topics
          </p>

          <div className="topic-buttons">
            <button onClick={() => handleGenerateProblem('Shortest Paths')}>
              Shortest Paths
            </button>
            <button onClick={() => handleGenerateProblem('DAGs and Topological Sort')}>
              DAGs & Topological Sort
            </button>
            <button onClick={() => handleGenerateProblem('Maximum Flow')}>
              Maximum Flow
            </button>
            <button onClick={() => handleGenerateProblem('Min-Cut Theorem')}>
              Min-Cut Theorem
            </button>
          </div>

          {generating && (
            <div className="generating">
              Generating problem...
            </div>
          )}

          {generatedProblem && !generating && (
            <div className="generated-problem">
              <pre>{generatedProblem}</pre>
              <button
                onClick={() => setGeneratedProblem('')}
                className="clear-btn"
              >
                Clear
              </button>
            </div>
          )}

          <button className="back-btn" onClick={() => setMode('select')}>
            Back to Practice Options
          </button>
        </div>
      )}
    </div>
  );
}

export default PracticeMode;
