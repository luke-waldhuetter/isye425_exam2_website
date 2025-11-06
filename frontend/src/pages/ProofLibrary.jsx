import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProofLibrary.css';

function ProofLibrary() {
  const [proofs, setProofs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProofs();
  }, []);

  const fetchProofs = async () => {
    try {
      const response = await axios.get('/api/proofs');
      setProofs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching proofs:', error);
      setLoading(false);
    }
  };

  const filteredProofs = filter === 'all'
    ? proofs
    : proofs.filter(p => p.category === filter);

  const categories = ['all', ...new Set(proofs.map(p => p.category))];

  if (loading) {
    return <div className="loading">Loading proofs...</div>;
  }

  return (
    <div className="proof-library">
      <h1>Proof Library</h1>
      <p className="subtitle">
        Master all the proofs required for your exam with step-by-step guidance
      </p>

      <div className="filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat === 'all' ? 'All Proofs' : cat}
          </button>
        ))}
      </div>

      <div className="proof-grid">
        {filteredProofs.map(proof => {
          const progress = JSON.parse(localStorage.getItem('examProgress') || '{}');
          const proofProgress = progress[proof.id] || {};

          return (
            <Link
              key={proof.id}
              to={`/proofs/${proof.id}`}
              className="proof-card"
            >
              <div className="proof-header">
                <h3>{proof.title}</h3>
                <span className={`difficulty ${proof.difficulty.toLowerCase()}`}>
                  {proof.difficulty}
                </span>
              </div>

              <div className="proof-category">{proof.category}</div>

              <p className="proof-theorem">{proof.theorem}</p>

              <div className="proof-footer">
                {proofProgress.mastered && (
                  <span className="mastered-badge">✓ Mastered</span>
                )}
                {proofProgress.attempts > 0 && !proofProgress.mastered && (
                  <span className="attempts-badge">
                    {proofProgress.attempts} attempts
                  </span>
                )}
                {!proofProgress.attempts && (
                  <span className="new-badge">Not started</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProofLibrary;
