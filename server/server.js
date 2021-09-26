import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';

// connect to database
import './database/index.js';

dotenv.config();

const app = express();

// parse json request body.
app.use(express.json());

// parse urlencoded request body.
app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.use('/api/auth', authRoutes);
