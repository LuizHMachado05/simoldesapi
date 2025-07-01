require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const operatorsRouter = require('./routes/operators');
const machinesRouter = require('./routes/machines');
const operationsRouter = require('./routes/operations');
const projectsRouter = require('./routes/projects');
const logsRouter = require('./routes/logs');
const authRouter = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 3001;

// Define your allowed origins in an array. This is crucial!
const allowedOrigins = [
  'https://simoldesproject.vercel.app', // Your main Vercel project URL (without the dynamic hash)
  'https://simoldesproject-hfxr-ldfrrso8i.vercel.app', // The specific deployment URL you just provided
  'http://localhost:5173', // Example: if your frontend runs on localhost:5173 for development
  'http://localhost:3000'  // Example: if your frontend runs on localhost:3000 for development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no 'origin' (like from Postman or curl)
    // OR if the origin is in our allowed list
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Include this if your frontend sends cookies or Authorization headers
}));

// This line `app.options('*', cors());` is generally not needed when using the above
// dynamic `cors` configuration, but it won't hurt if you leave it.
app.options('*', cors());

app.use(bodyParser.json());

// API Routes
app.use('/api/operators', operatorsRouter);
app.use('/api/machines', machinesRouter);
app.use('/api/operations', operationsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/logs', logsRouter);
app.use('/api/auth', authRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.listen(PORT, () => {
  console.log(`API backend rodando em http://localhost:${PORT}`);
});