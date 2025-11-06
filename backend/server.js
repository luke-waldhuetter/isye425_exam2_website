import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { proofs, definitions, quizQuestions } from './proofData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Routes

// Get all proofs
app.get('/api/proofs', (req, res) => {
  const proofList = proofs.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    difficulty: p.difficulty,
    theorem: p.theorem
  }));
  res.json(proofList);
});

// Get specific proof
app.get('/api/proofs/:id', (req, res) => {
  const proof = proofs.find(p => p.id === req.params.id);
  if (!proof) {
    return res.status(404).json({ error: 'Proof not found' });
  }
  res.json(proof);
});

// Get definitions
app.get('/api/definitions', (req, res) => {
  res.json(definitions);
});

// Get quiz questions
app.get('/api/quiz', (req, res) => {
  res.json(quizQuestions);
});

// AI Tutor endpoint
app.post('/api/tutor', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create system prompt for the AI tutor
    const systemPrompt = `You are an expert tutor for ISYE 425 (Combinatorial Optimization), specializing in graph theory, shortest paths, and maximum flow algorithms.

Your role is to:
1. Help students understand proofs step-by-step
2. Explain key concepts and definitions
3. Guide students through practice problems
4. Answer questions about theorems and their applications
5. Be patient and encouraging

Focus areas for this exam:
- Shortest path algorithms (Bellman-Ford, Dijkstra)
- DAGs and topological sorting
- Maximum flow and min-cut theorem
- Correctness proofs and algorithm analysis

When explaining proofs:
- Break down complex steps into simpler ideas
- Highlight the key insight or technique
- Connect to related concepts
- Ask guiding questions to check understanding

Be concise but thorough. Use mathematical notation when helpful.

${context ? `\n\nCurrent context: ${context}` : ''}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({
      error: 'Failed to get AI response',
      details: error.message
    });
  }
});

// Proof practice endpoint - checks student's proof step
app.post('/api/practice/check-step', async (req, res) => {
  try {
    const { proofId, stepNumber, studentAnswer } = req.body;

    const proof = proofs.find(p => p.id === proofId);
    if (!proof) {
      return res.status(404).json({ error: 'Proof not found' });
    }

    const correctStep = proof.steps.find(s => s.step === stepNumber);
    if (!correctStep) {
      return res.status(404).json({ error: 'Step not found' });
    }

    // Use AI to evaluate the student's answer
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are evaluating a student's proof step for ISYE 425. Compare their answer to the correct answer and provide feedback.

Be strict but fair:
- Check for mathematical correctness
- Ensure key ideas are present
- Accept equivalent formulations
- Point out missing crucial elements

Provide:
1. A correctness score (0-100)
2. Brief feedback (2-3 sentences)
3. Whether to accept the answer (true/false)`
        },
        {
          role: "user",
          content: `Proof: ${proof.title}
Step ${stepNumber}: ${correctStep.explanation}

Correct answer: ${correctStep.content}

Student's answer: ${studentAnswer}

Evaluate the student's answer.`
        }
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const evaluation = completion.choices[0].message.content;

    res.json({
      correctStep: correctStep.content,
      evaluation,
      explanation: correctStep.explanation
    });

  } catch (error) {
    console.error('Error checking proof step:', error);
    res.status(500).json({ error: 'Failed to check answer' });
  }
});

// Generate custom practice problem
app.post('/api/practice/generate', async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Generate a practice problem for ISYE 425 on the topic of ${topic}.
Difficulty level: ${difficulty || 'medium'}

The problem should:
1. Test understanding of key concepts
2. Require applying the relevant theorem or algorithm
3. Be similar in style to exam problems
4. Include a brief solution sketch

Format:
PROBLEM: [state the problem]
SOLUTION: [provide solution steps]`
        },
        {
          role: "user",
          content: `Generate a ${difficulty || 'medium'} difficulty problem on ${topic}`
        }
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    const problem = completion.choices[0].message.content;
    res.json({ problem });

  } catch (error) {
    console.error('Error generating problem:', error);
    res.status(500).json({ error: 'Failed to generate problem' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ISYE 425 Exam Prep API is running',
    openaiConfigured: !!process.env.OPENAI_API_KEY
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`OpenAI API configured: ${!!process.env.OPENAI_API_KEY}`);
});
