import mongoose from 'mongoose';
import JobApplication from './jobApplication.js';

/* Schema for job board. */
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
    jobApplications: [{ JobApplication }],
  },
  { timestamps: true }
);

export default jobBoardSchema;
