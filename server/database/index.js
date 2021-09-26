import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//connet to database
const database = mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('successfully connected to db'))
  .catch((error) => console.log(error));
export default database;
