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

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
}));

// VERY IMPORTANT (preflight)
app.options('*', cors());

app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send('API Working'));

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
