import mongoose from 'mongoose';

/* User account schema */
const userAccountSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
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
  },
  { timestamps: true }
);

const UserAccount = mongoose.model('UserAccount', userAccountSchema);
export default UserAccount;
