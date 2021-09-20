import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

// parse json request body.
app.use(express.json());

// parse urlencoded request body.
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // Connect to database.
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('successfully connected to db'))
    .catch((error) => console.log(error));

  console.log(`Server is running on port: ${PORT}`);
});

app.use('/api/auth', authRoutes);
