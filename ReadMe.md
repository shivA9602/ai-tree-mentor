🌳 AI Tree Mentor
Emotion-Driven 3D AI Interaction System


=====Overview======

AI Tree Mentor is a full-stack interactive web application that integrates a 3D rendered tree with structured Large Language Model (LLM) output.
Users input a personal or professional problem, and the system:
Sends the input to an LLM backend
Enforces structured JSON output

======Classifies sentiment:======

Maps emotional state to a hex color.
Dynamically updates the 3D tree’s appearance.
The application demonstrates deterministic UI behavior driven by probabilistic AI output.


=====Repository Structure======


ai-tree-mentor/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── TreeScene.jsx
│   │   └── App.css
│   └── public/tree.glb
│
├── backend/
│   ├── server.js
│   └── .env (not committed)
│
└── README.md

========Installation Guide=========

1️. Backend Setup:

cd backend
npm install

Create .env inside /backend:

GROQ_API_KEY=your_api_key_here

---Start backend:----

node server.js

------Runs at:-----

http://localhost:5000



3. Frontend Setup:


cd frontend
npm install
npm run dev

Runs at:

http://localhost:5173



====Example Test Inputs======


------Negative----------

“I failed my exam and I want to give up.”

-------Neutral--------

“Should I change my job?”

---------Positive-----------

“I just got promoted at work.”



=======System Architecture:===========

React Frontend (Vite + Three.js)
        ↓
Express Backend (Node.js)
        ↓
Groq LLM (OpenAI-compatible SDK)
        ↓
Structured JSON Response
        ↓
Frontend State Update
        ↓
3D Tree Color + Lighting Transition


=========Frontend Architecture=========

----Technologies------

React (Vite)

Three.js

react-three-fiber

@react-three/drei


==========Production Improvements (Future Scope)=========

------If productionized:---------

Schema validation via Zod
Rate limiting middleware
Input sanitization
LLM retry mechanism
Caching layer
Serverless deployment (Render/Vercel)
Monitoring and logging
Streaming responses


=======Conclusion=========

AI Tree Mentor demonstrates how structured LLM outputs can reliably drive real-time 3D visual interactions, combining frontend rendering, backend validation, and AI orchestration into a clean, scalable architecture.

