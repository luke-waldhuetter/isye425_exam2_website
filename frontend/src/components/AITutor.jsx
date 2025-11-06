import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/AITutor.css';

function AITutor({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your ISYE 425 AI tutor. I can help you understand proofs, explain concepts, and answer questions about the exam material. What would you like to study?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('/api/tutor', {
        message: input,
        context: `The student is studying for ISYE 425 Exam 2, covering shortest paths, DAGs, topological sorting, and maximum flow.`
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.data.reply
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure the OpenAI API key is configured in the backend .env file.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "Explain Dijkstra's algorithm",
    "What is a topological sort?",
    "How does the max-flow min-cut theorem work?",
    "Why do we need non-negative edges for Dijkstra?",
    "What's the difference between Bellman-Ford and Dijkstra?"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  return (
    <div className="ai-tutor">
      <div className="tutor-header">
        <h2>AI Tutor</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="quick-questions">
        <p className="quick-label">Quick questions:</p>
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            className="quick-question-btn"
            onClick={() => handleQuickQuestion(q)}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-content">
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div className="message-content typing">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about the material..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}

export default AITutor;
