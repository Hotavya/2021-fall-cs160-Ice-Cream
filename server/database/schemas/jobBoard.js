import mongoose from 'mongoose';
import JobApplicationSchema from './jobApplication.js';

/* Schema for job board; it is nested inside the userAccount model */
const jobBoardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserAccount',
    },
    jobApplications: [{ JobApplicationSchema }],
  },
  { timestamps: true }
);
export default jobBoardSchema;
