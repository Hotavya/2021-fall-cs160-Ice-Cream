import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

var app = express();
var db, collection

app.listen(5000, () => {
    mongoose.connect(process.env.DATABASE, function(error, client) {
        if(error) {
            throw error;
        }
        db = mongoose.connection;
        collection = db.collection("useraccounts");
        console.log("Connected to `" + process.env.DATABASE_NAME + "`!");
    });
});

app.get("/jobs", (request, response) => {
    collection.find({}).toArray((result, error) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});