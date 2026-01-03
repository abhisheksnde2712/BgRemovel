import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';
import imageRouter from './routes/imageRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

await connectDB();

// ✅ SIMPLE & CORRECT CORS (JWT BASED)
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://bg-removel-p6oc.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'token'],
  })
);

app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send('API Working'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
