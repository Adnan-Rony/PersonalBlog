import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import blogRoutes from './router/blogRoutes.js';
import indexRoutes from './router/index.routes.js';
import userRoutes from './router/userRoutes.js';
import AdminRoute from './router/AdminRoute.js';
import resumeRoutes from './router/resumeRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [
    'https://devthought.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'https://ecommercetechdev.vercel.app',
    'https://adnanrony.netlify.app',
  ],
  credentials: true,
};

app.use(cors(corsOptions));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/v1', indexRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/admin', AdminRoute);
app.use('/api/v1/resume', resumeRoutes);

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── BUG FIX 6: Global error handler ─────────────────────────────────────────
// Without this, Express leaks full stack traces to clients in production
// and unhandled controller errors cause silent 500s with no JSON body.
app.use((err, req, res, next) => {
  console.error('[Global Error]', err);
  const statusCode = err.status || err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Something went wrong. Please try again.'
      : err.message || 'Internal Server Error';

  res.status(statusCode).json({ success: false, message });
});

export default app;
