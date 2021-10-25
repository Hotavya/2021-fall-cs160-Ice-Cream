import mongoose from 'mongoose';
import JobApplicationSchema from './jobApplication.js';

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
    jobApplications: [{ JobApplicationSchema }],
  },
  { timestamps: true }
);

const JobBoard = mongoose.model('JobBoard', jobBoardSchema);
export default JobBoard;