import UserAccount from '../database/schemas/userAccount.js';
import * as EmailValidator from 'email-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

// Sign up
export const signup = async (req, res) => {
  const { email, password } = req.body;
  // Check if user left email or password field empty
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    });
  }
  // Check if email is already used by an account
  else if (await UserAccount.exists({ email: email })) {
    console.log('here');
    return res.status(400).json({
      message: 'Account already exists',
    });
  }
  // // Check if email entered is correct format
  // else if (!EmailValidator.validate(email)) {
  //   return res.status(400).json({
  //     message: 'Invalid email address',
  //   });
  // }

  // Check if user password is 8 or more characters in length
  else if (password.length < 8) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters in length',
    });
  }
  // Create Account
  else {
    try {
      const newUserAccount = new UserAccount({ email, password });
      await newUserAccount.save();
      // Create JWT for newly created user
      const token = jwt.sign(
        {
          email: newUserAccount.email,
          userId: newUserAccount._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h',
        }
      );
      res.status(200).json({ token: token, message: 'Auth successful' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Account not created. Something went wrong in the server',
      });
    }
  }
};

// Sign in
export const signin = async (req, res) => {
  UserAccount.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (typeof user === undefined) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        // if (result) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '100h',
          }
        );
        return res.status(200).json({
          message: 'Auth successful',
          token: token,
        });
        // }
        res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
