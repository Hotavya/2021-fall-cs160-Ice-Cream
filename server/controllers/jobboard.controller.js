import dotenv from 'dotenv';
import UserAccount from '../database/schemas/userAccount.js';
dotenv.config();

// Get list of jobboard for a user
export const getAllJobBoard = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userAccount = await UserAccount.findById(userId);

    // If user with this ID was not found
    if (!userAccount) {
      return res.status(404).json({
        error: 'User Not Found',
        message: 'Job board cannot be created because user was not found',
      });
    }

    return res.status(200).json({
      jobBoards: userAccount.jobBoards,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong in the server',
    });
  }
};

// Get a user's jobboard with a specfic id
export const getJobBoard = async (req, res) => {
  try {
    const userId = req.user.userId;
    const boardId = req.params.boardId;

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
      return res.status(400).json({
        error: 'Not Found error',
        messsage: 'Job board was not found',
      });
    return res.status(200).json({
      jobBoard,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong in the server',
    });
  }
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
    const boardId = req.params.boardId;

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
      return res.status(400).json({
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
    console.log(error);
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

  // Check if user left job title or company field empty
  if (!jobTitle || !company) {
    return res.status(400).json({
      error: 'Invalid Request Error',
      message: 'Job title and company are required',
    });
  }
  // Update job application
  try {
    const userId = req.user.userId;
    const boardId = req.params.boardId;
    const applicationId = req.params.applicationId;

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
      return res.status(404).json({
        error: 'Not Found error',
        messsage: 'Job board was not found',
      });

    const application = jobBoard.jobApplications.find(
      (application) => application._id == applicationId
    );

    if (!application) {
      return res.status(404).json({
        error: 'Not Found error',
        messsage: 'Job application was not found',
      });
    }

    //TODO: Improve this so that other field can be updated as well
    application.jobTitle = jobTitle;
    application.company = company;
    application.status = status;

    userAccount.save();
    return res.status(200).json({
      message: 'Job application successfully updated',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message:
        'Job application not updated. Something went wrong in the server',
    });
  }
};

export const deleteJobApplication = async (req, res) => {
  const userId = req.user.userId;
  const boardId = req.params.boardId;
  const applicationId = req.params.applicationId;

  const userAccount = await UserAccount.findById(userId);

  // If user with this ID was not found
  if (!userAccount) {
    return res.status(404).json({
      error: 'User Not Found',
      message: 'Job board cannot be created because user was not found',
    });
  }

  // Find the jobboard
  const jobBoard = userAccount.jobBoards.find((board) => boardId == board._id);
  if (!jobBoard)
    return res.status(400).json({
      error: 'Not Found error',
      messsage: 'Job board was not found',
    });

  try {
    const result = await UserAccount.updateOne(
      { _id: userId, 'jobBoards._id': boardId },
      {
        $pull: {
          'jobBoards.$.jobApplications': { _id: applicationId },
        },
      }
    );

    //TODO: had check to see if a application was found and deleted
    console.log(result);
    return res.status(200).json({
      message: 'Job application successfully deleted',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message:
        'Job application not deleted. Something went wrong in the server',
    });
  }
};
