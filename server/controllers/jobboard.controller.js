import dotenv from 'dotenv';
import jobBoardSchema from '../database/schemas/jobBoard.js';
import jobApplicationSchema from '../database/schemas/jobApplication.js';
dotenv.config();

export const jobboard = async (req, res) => {

     jobBoardSchema.find({_id:req.body.jobboardid})
     .exec()
      .then(jobboard => {
          if (jobboard.length > 0) {
              return res.status(200).json({
                  jobboard
              });
            }
              else
              {
                return res.status(404).json({
                    message: "jobboard not found"});
              } 
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
};

export const createjobapplication = async (req, res) => {
    const { jobTitle, company, companyWebsite, postingUrl, status, jobDescription, note, dateApplied, interviews, offerDetail } = req.body;

    // Check if user left job title or company field empty
    if(!jobTitle || !company) {
        return res.status(400).json({
        message: "Job title and company are required"
        });
    }
    // Create job application
    else {
        try {
            const newJobApplication = new jobApplicationSchema({ jobTitle, company, companyWebsite, postingUrl, status, jobDescription, note, dateApplied, interviews, offerDetail });
            await newJobApplication.save();
            return res.status(200).json({
                message: 'Job application successfully created'
            });
        } catch (error) {
            return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Job application not created. Something went wrong in the server'
        });
        }
    }
};

export const updatejobapplication = async (req, res) => {   
    const { jobTitle, company, companyWebsite, postingUrl, status, jobDescription, note, dateApplied, interviews, offerDetail } = req.body;

    // Check if user left job title or company field empty
    if(!jobTitle || !company) {
        return res.status(400).json({
        message: "Job title and company are required"
        });
    }
    else {
        try{
            // Get document ID
            var id = req.params.id;
            // Find document by ID and update with new values
            jobApplicationSchema.findByIdAndUpdate({ _id: new mongo.Types.ObjectId(id) }, { jobTitle: jobTitle, company: company, companyWebsite: companyWebsite, postingUrl: postingUrl, status: status, jobDescription: jobDescription, note: note, dateApplied: dateApplied, interviews: interviews, offerDetail: offerDetail }, function(err, result) {
                if(err) {
                    return res.status(500).json({
                        message: err
                    });
                }
                // Throw error if document does not exist
                else if(result == null) {
                    return res.status(500).json({
                    message: 'Job application does not exist'
                    });
                }
                else {
                    return res.status(200).json({
                    message: 'Job application successfully updated'
                    });
                }
                });
        }
        catch (error) {
            return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Job application not updated. Something went wrong in the server'
            });
        }
    }
};

export const deletejobapplication = async (req, res) => {
    try{
        var id = req.params.id;
        jobApplicationSchema.findByIdAndDelete({ _id: new mongo.Types.ObjectId(id) }, function(err, result) {
            if(err) {
                return res.status(500).json({
                    message: err
                });
            }
            else if(result == null) {
                return res.status(500).json({
                message: 'Job application does not exist'
                });
            }
            else {
                return res.status(200).json({
                message: 'Job application successfully deleted'
                });
            }
        });
    }
    catch (error) {
        return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Job application not deleted. Something went wrong in the server'
        });
    }
};