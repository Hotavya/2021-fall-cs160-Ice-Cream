import UserAccount from '../database/schemas/userAccount.js';
import * as EmailValidator from 'email-validator';

// Sign up
export const signup = async (req, res) => {
  const { email, password } = req.body;
  // Check if user left email or password field empty
  if(!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }
  // Check if email is already used by an account
  else if(await UserAccount.exists({ email: email })) {
    return res.status(400).json({
      message: 'Account already exists'
    });
  }
  // Check if email entered is correct format
  else if(!EmailValidator.validate(email)) {
    return res.status(400).json({
      message: "Invalid email address"
    });
  }
  // Check if user password is 8 or more characters in length
  else if(password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters in length"
    });
  }
  // Create Account
  else {
    try {
      const newUserAccount = new UserAccount({ email, password });
      await newUserAccount.save();
      //res.redirect('/auth/signin');
    } catch (error) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Account not created. Something went wrong in the server'
      });
    }
    return res.status(200).send({ message: 'Account Successfully Created' });
  }
};

// Sign in
export const signin = async (req, res) => {
  const { email, password } = req.body;

  UserAccount.findOne({email}, (err, user) => {
    if(err || !email) {
      return res.status(400).json({
        message: "Account does not exist with these credentials"
      })
    }
  })
};