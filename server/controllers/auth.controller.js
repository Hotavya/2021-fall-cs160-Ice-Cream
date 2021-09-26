import UserAccount from '../database/schemas/userAccount.js';

//TODO:This is just for feasability test, write robust implementation later.
export const signup = async (req, res) => {
  const { username, email } = req.body;
  try {
    const newUserAccount = new UserAccount({ username, email });
    await newUserAccount.save();
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong in the server',
    });
  }
  return res.status(200).send({ message: 'This signup was successfull' });
};
