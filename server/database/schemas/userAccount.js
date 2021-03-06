import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jobBoardSchema from './jobBoard.js';

/* User account schema */
const userAccountSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    bio: {
      type: String,
    },
    lastActive: {
      type: Date,
      default: Date.now(),
    },
    profession: {
      type: String,
    },
    jobBoards: [jobBoardSchema],
  },
  { timestamps: true }
);

// Hash user password before storing in database

userAccountSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);
export default UserAccount;
