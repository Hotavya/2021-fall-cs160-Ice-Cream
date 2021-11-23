import dotenv from 'dotenv';
import mongo from 'mongoose';
import UserAccount from '../database/schemas/userAccount.js';

import jobBoardSchema from '../database/schemas/jobBoard.js';
import jobApplicationSchema from '../database/schemas/jobApplication.js';
dotenv.config();

export const getJobBoard = async (req, res) => {
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
export const createJobBoard = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.userId;

  //Check if title or company field empty
  if (!title) {
    return res.status(400).json({
      message: 'title cannot be empty',
    });
  }
  // Create job board
  try {
    // Get user account
    const userAccount = await UserAccount.findById(userId);

    // If user with this ID was not found
    if (!userAccount) {
      return res.status(404).json({
        error: 'User Not Found',
        message: 'Job board cannot be created because user was not found',
      });
    }

    // Get the user jobBoards and add a new one
    const userJobBoards = userAccount.jobBoards;
    userJobBoards.push({ title });
    await userAccount.save();

    // return the newly create jobBoard
    const newBoard = userAccount.jobBoards[userJobBoards.length - 1];
    return res.status(200).json({ data: newBoard });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Job board not created. Something went wrong in the server',
    });
  }
};

export const createJobApplication = async (req, res) => {
  const {
    jobTitle,
    company,
    companyWebsite,
    postingUrl,
    status,
    jobDescription,
    note,
    dateApplied,
    interviews,
    offerDetail,
  } = req.body;

  // Check if user left job title or company field empty
  if (!jobTitle || !company) {
    return res.status(400).json({
      error: 'Invalid Request Error',
      message: 'Job title and company are required',
    });
  }
  // Create job application
  try {
    const userId = req.user.userId;
    const boardId = req.params.boardid;

    const userAccount = await UserAccount.findById(userId);

    // If user with this ID was not found
    if (!userAccount) {
      return res.status(404).json({
        error: 'User Not Found',
        message: 'Job board cannot be created because user was not found',
      });
    }

    // Find the jobboard
    const jobBoard = userAccount.jobBoards.find(
      (board) => boardId == board._id
    );
    if (!jobBoard)
      return res.status(400).jsons({
        error: 'Not Found error',
        messsage: 'Job board was not found',
      });

    // Add the new job application to the jobboard
    const newJobApplication = {
      jobTitle,
      company,
      companyWebsite,
      postingUrl,
      status,
      jobDescription,
      note,
      dateApplied,
      interviews,
      offerDetail,
    };

    jobBoard.jobApplications.push(newJobApplication);
    await userAccount.save();
    return res.status(200).json({
      message: 'Job application successfully created',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message:
        'Job application not created. Something went wrong in the server',
    });
  }
};

export const updateJobApplication = async (req, res) => {
  const {
    jobTitle,
    company,
    companyWebsite,
    postingUrl,
    status,
    jobDescription,
    note,
    dateApplied,
    interviews,
    offerDetail,
  } = req.body;

  // Check if user left job title or company field empty
  if (!jobTitle || !company) {
    return res.status(400).json({
      message: 'Job title and company are required',
    });
  } else {
    try {
      // Get document ID
      var id = req.params.id;
      // Find document by ID and update with new values
      jobApplicationSchema.findByIdAndUpdate(
        { _id: new mongo.Types.ObjectId(id) },
        {
          jobTitle: jobTitle,
          company: company,
          companyWebsite: companyWebsite,
          postingUrl: postingUrl,
          status: status,
          jobDescription: jobDescription,
          note: note,
          dateApplied: dateApplied,
          interviews: interviews,
          offerDetail: offerDetail,
        },
        function (err, result) {
          if (err) {
            return res.status(500).json({
              message: err,
            });
          }
          // Throw error if document does not exist
          else if (result == null) {
            return res.status(500).json({
              message: 'Job application does not exist',
            });
          } else {
            return res.status(200).json({
              message: 'Job application successfully updated',
            });
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message:
          'Job application not updated. Something went wrong in the server',
      });
    }
  }
};

export const deleteJobApplication = async (req, res) => {
  try {
    var id = req.params.id;
    jobApplicationSchema.findByIdAndDelete(
      { _id: new mongo.Types.ObjectId(id) },
      function (err, result) {
        if (err) {
          return res.status(500).json({
            message: err,
          });
        } else if (result == null) {
          return res.status(500).json({
            message: 'Job application does not exist',
          });
        } else {
          return res.status(200).json({
            message: 'Job application successfully deleted',
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message:
        'Job application not deleted. Something went wrong in the server',
    });
  }
};
