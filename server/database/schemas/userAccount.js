import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


/* User account schema */
const UserAccountSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash user password before storing in database
UserAccountSchema.pre('save', async function(next) {
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
})
                      
const UserAccount = mongoose.model('UserAccount', UserAccountSchema);
export default UserAccount;