import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';
import imageRouter from './routes/imageRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

await connectDB();

const allowedOrigins = [
  'http://localhost:5173',
  'https://bg-removel-p6oc.vercel.app',
];

// 🔥 MANUAL CORS HEADERS (REQUIRED FOR VERCEL)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );

  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // 🔥 PRE-FLIGHT FIX
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// CORS middleware (secondary)
app.use(cors({ credentials: true }));

app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send('API Working'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
