import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';
import imageRouter from './routes/imageRoutes.js';

// App Config
const PORT = process.env.PORT || 4000;
const app = express();
await connectDB();

// ALLOWED FRONTENDS
const allowedOrigins = [
  "http://localhost:5173",
  "https://bg-removel-p6oc.vercel.app",
];

// CORS FIX (VERY IMPORTANT)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman / Server requests
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ MUST HANDLE PREFLIGHT REQUESTS
app.options("*", cors());

// JSON
app.use(express.json());

// API routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => res.send("API Working"));

app.listen(PORT, () =>
  console.log("Server running on port " + PORT)
);
