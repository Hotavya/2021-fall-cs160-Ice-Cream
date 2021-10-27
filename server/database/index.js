import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//connect to database
const database = mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Successfully connected to db'))
  .catch((error) => console.log(error));
export default database;