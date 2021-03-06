import mongoose from 'mongoose';

/* Schema for job application , used inside jobBoard as a nested object */
const JobApplicationSchema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    companyWebsite: {
      type: String,
    },
    postingUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        'WISHLIST',
        'APPLIED',
        'INTERVIEWING',
        'OFFER',
        'REJECTED WITH INTERVIEW',
        'REJECTED WITHOUT INTERVIEW',
      ],
      default: 'WISHLIST',
    },
    jobDescription: {
      type: String,
    },
    note: {
      type: String,
    },
    dateApplied: {
      type: Date,
    },
    interviews: [
      {
        date: { type: Date, default: new Date() },
        interviewNote: { type: String },
      },
    ],
    offerDetail: {
      location: { type: String },
      offerDate: { type: Date },
      deadline: { type: Date },
      baseSalary: { type: Number },
      totalCompensation: { type: Number },
      note: { type: String },
    },
  },
  { timestamps: true }
);

export default JobApplicationSchema;
