import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jobBoardSchema from '../database/schemas/jobBoard.js';
dotenv.config();

var app = express();
var db, collection

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
