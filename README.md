# ISYE 425 Exam 2 Interactive Learning Platform

An interactive, full-stack web application designed to help you master the proofs and concepts for your ISYE 425 Combinatorial Optimization exam. This platform combines step-by-step proof learning, AI tutoring, practice problems, and quizzes to provide a comprehensive exam preparation experience.

## Features

### 1. Interactive Proof Viewer
- **Step-by-step learning**: Navigate through proofs one step at a time with detailed explanations
- **Show all mode**: View the complete proof at once for comprehensive review
- **Practice mode**: Test yourself by writing each step before revealing the answer
- **Progress tracking**: Track which proofs you've mastered

### 2. AI Tutor
- **Intelligent assistance**: Get help from an AI tutor specialized in graph algorithms and optimization
- **Context-aware**: Ask questions about specific proofs, concepts, or techniques
- **Always available**: Access tutoring help from any page in the application
- **Quick questions**: Pre-loaded common questions for fast assistance

### 3. Practice Tools
- **Flashcards**: Review key definitions and concepts
- **Blank sheet practice**: Simulate exam conditions by writing proofs from memory
- **AI-generated problems**: Get custom practice problems on specific topics
- **Interactive exercises**: Fill-in-the-blank and step-by-step practice

### 4. Quiz System
- **Practice quizzes**: Test your understanding with multiple-choice questions
- **Immediate feedback**: See explanations for correct and incorrect answers
- **Progress tracking**: Monitor your quiz performance over time
- **Exam-style questions**: Questions designed to mirror exam format

### 5. Study Dashboard
- **Progress overview**: See your mastery status for all required proofs
- **Study tips**: Exam preparation guidance and best practices
- **Quick actions**: Easy access to all study tools
- **Performance metrics**: Track attempts and completion rates

## Exam Coverage

This platform covers all proofs required for ISYE 425 Exam 2:

### Shortest Paths
- Proposition 2.10 (parts 1 & 2)
- Theorem 2.11 (Bellman-Ford Correctness)
- Proposition 2.19 (DAG Shortest Paths)
- Dijkstra's Algorithm Validity Proof

### DAGs and Topological Sorting
- Proposition 2.16 (DAG has vertex with in-degree 0)
- Theorem 2.17 (Existence of Topological Sort)
- Theorem 2.18 (Topological Sort Algorithm Correctness)

### Maximum Flow
- Theorem 2.20 (Max-Flow Min-Cut Theorem)
- Proposition 2.21 (Integrality of Max Flow)
- Proposition 3.1 (Flow Decomposition)

## Technology Stack

### Frontend
- **React 18**: Modern UI library for interactive components
- **React Router**: Client-side routing for multi-page navigation
- **Axios**: HTTP client for API communication
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with gradients and animations

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **OpenAI API**: GPT-4 integration for AI tutoring
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

## Installation & Setup

### 1. Clone the Repository

```bash
cd isye425_exam2_website
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

**Important**: Never commit your `.env` file to version control!

### 4. Set Up the Frontend

```bash
cd ../frontend
npm install
```

## Running the Application

You need to run both the backend and frontend servers.

### Option 1: Two Terminal Windows

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
```

The backend will run on `http://localhost:3001`

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### Option 2: Using npm scripts (if you're in the root directory)

You can also add a `package.json` in the root directory to run both servers simultaneously using `concurrently`.

## Accessing the Application

Once both servers are running, open your browser and navigate to:

```
http://localhost:3000
```

You should see the dashboard with your exam preparation tools ready to use!

## Usage Guide

### Getting Started

1. **Dashboard**: Start at the dashboard to see your progress overview
2. **Proof Library**: Browse all available proofs organized by category
3. **Select a Proof**: Click on any proof to view it in detail

### Learning a Proof

1. Navigate to a proof from the library
2. Read the theorem statement
3. Choose **Learning Mode** to study with explanations
4. Use the step-by-step navigator or show all steps
5. Switch to **Practice Mode** to test yourself
6. Mark as mastered when you can write it from memory

### Using the AI Tutor

1. Click "Ask AI Tutor" in the top navigation
2. Type your question or use a quick question button
3. Get detailed explanations and guidance
4. The tutor is available on any page

### Taking Practice Quizzes

1. Go to the Quiz page
2. Answer each multiple-choice question
3. Submit your answer to see if it's correct
4. Read the explanation
5. Continue through all questions
6. Review your final score and performance feedback

### Practice Tools

**Flashcards:**
- Review definitions one at a time
- Test yourself before flipping to the answer

**Blank Sheet Practice:**
- Select a proof
- Write it from memory in the text area
- Check your answer against the correct proof

**AI-Generated Problems:**
- Choose a topic
- Get a custom practice problem
- Work through it at your own pace

## Tips for Exam Success

1. **Master the proofs thoroughly**: Being able to write every step from memory is crucial
2. **Understand, don't just memorize**: Focus on the logical flow and key insights
3. **Practice regularly**: Use the practice mode and flashcards daily
4. **Use the AI tutor**: Don't hesitate to ask questions when you're stuck
5. **Track your progress**: Mark proofs as mastered only when you truly know them
6. **Review definitions**: Precise language is essential for the exam
7. **Take multiple quizzes**: Test your understanding frequently

## Project Structure

```
isye425_exam2_website/
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── proofData.js        # All proof content and quiz questions
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment variable template
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   └── AITutor.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProofLibrary.jsx
│   │   │   ├── ProofViewer.jsx
│   │   │   ├── QuizPage.jsx
│   │   │   └── PracticeMode.jsx
│   │   ├── styles/         # CSS stylesheets
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # React entry point
│   ├── index.html
│   ├── vite.config.js      # Vite configuration
│   └── package.json        # Frontend dependencies
├── PDFs/                   # Course materials (reference only)
└── README.md              # This file
```

## API Endpoints

### Proofs
- `GET /api/proofs` - Get all proofs (summary)
- `GET /api/proofs/:id` - Get specific proof with steps
- `GET /api/definitions` - Get all definitions

### Quizzes
- `GET /api/quiz` - Get quiz questions

### AI Tutor
- `POST /api/tutor` - Send message to AI tutor
  - Body: `{ message: string, context?: string }`
  - Returns: `{ reply: string }`

### Practice
- `POST /api/practice/check-step` - Check student's proof step
- `POST /api/practice/generate` - Generate custom practice problem

### Health
- `GET /api/health` - Server health check

## Customization

### Adding New Proofs

Edit `backend/proofData.js` and add a new proof object to the `proofs` array:

```javascript
{
  id: "unique-id",
  title: "Proof Title",
  category: "Category Name",
  difficulty: "Easy|Medium|Hard",
  theorem: "Theorem statement",
  steps: [
    {
      step: 1,
      content: "Step content",
      explanation: "Why this step",
      keyTerm: "key concept"
    },
    // ... more steps
  ]
}
```

### Adding Quiz Questions

Edit `backend/proofData.js` and add to the `quizQuestions` array:

```javascript
{
  id: "q-id",
  question: "Question text",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correct: 0, // index of correct answer
  explanation: "Explanation of the answer"
}
```

## Troubleshooting

### Backend won't start
- Check that you have Node.js installed: `node --version`
- Ensure you're in the backend directory
- Verify .env file exists with valid OpenAI API key
- Check port 3001 isn't already in use

### Frontend won't start
- Check that you're in the frontend directory
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### AI Tutor not working
- Verify OpenAI API key is correctly set in backend/.env
- Check backend console for error messages
- Ensure you have API credits in your OpenAI account
- Check network connectivity

### Styling issues
- Hard refresh the browser: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check browser console for CSS loading errors

## Development

### Running in Development Mode

The frontend uses Vite's hot module replacement (HMR), so changes to React components will update instantly without refreshing.

For backend changes, you can use nodemon:

```bash
npm install -g nodemon
cd backend
nodemon server.js
```

### Building for Production

To build the frontend for production:

```bash
cd frontend
npm run build
```

This creates optimized files in the `dist` directory.

## Privacy & Data Storage

- **Local storage**: Progress tracking uses browser localStorage (data stays on your device)
- **No user accounts**: No personal data is collected or stored on servers
- **API calls**: Only your questions to the AI tutor are sent to OpenAI's servers
- **Secure**: Your OpenAI API key is stored server-side and never exposed to the browser

## Contributing

This is a personal study tool, but if you'd like to improve it:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Course materials and proofs are property of the ISYE 425 course instructors.

## Acknowledgments

- ISYE 425 course staff for the excellent lecture materials
- OpenAI for GPT-4 API
- React and Node.js communities

## Support

If you encounter issues:
1. Check this README's troubleshooting section
2. Review error messages in browser console and backend terminal
3. Ensure all dependencies are installed correctly
4. Verify your OpenAI API key is valid

## Good Luck!

Remember: **Knowing a proof means you can write every step on a blank sheet of paper without looking at any material!**

Use this tool regularly, practice diligently, and you'll be well-prepared for your exam.
