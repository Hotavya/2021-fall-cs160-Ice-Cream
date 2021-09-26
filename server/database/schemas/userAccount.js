import mongoose from 'mongoose';

//TODO:This is just for feasability test, revise this.
const userAccountSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);
export default UserAccount;
