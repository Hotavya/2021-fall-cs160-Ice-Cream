import dotenv from 'dotenv';
import mongo from 'mongoose';
import jobBoardSchema from '../database/schemas/jobBoard.js';
//import JobBoard from '../database/schemas/jobBoard.js';
dotenv.config();

export const getjobboard = async (req, res) => {
  jobBoardSchema
    .find({ _id: req.body.jobboardid })
    .exec()
    .then((jobboard) => {
      if (jobboard.length > 0) {
        return res.status(200).json({
          jobboard,
        });
      } else {
        return res.status(404).json({
          message: 'jobboard not found',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//Create a job board

export const createjobboard = async (req, res) => {
  const { title /*, description, user, jobApplications*/} = req.body;
  //const title = "test";
  // Check if title or company field empty
  if(!title) {
      return res.status(400).json({
      message: "title is empty"
      });
  }
  // Create job board
  else {
      try {
          const newJobBoard = new jobBoardSchema( title/*, description, user, jobApplications*/ );
          await newJobBoard.save();
          return res.status(200).json({
              message: 'Job board successfully created'
          });
      } catch (error) {
          return res.status(500).json({
          error: 'Internal Server Error',
          message: 'Job board not created. Something went wrong in the server'
      });
      }
  }
};