// require file (connect)
const CONNECT = require('../connection/connect');

// require {schema - model} of mongoose package
let { Schema, model } = require('mongoose');

// DB schema
const COLLECTION = new Schema({
    name: { 
        type: String, required: true, trim: false 
    },
    email: { 
        type: String, required: true, trim: false,  unique: true
    },
    password: { 
        type: String, required: true, trim: false 
    },
    // newPassword: { type: String },
    // confirmPassword: { type: String }

}, { timestamps: true, versionKey: false });

// export file (auth_s)
module.exports = model(`${process.env.TABLE}`, COLLECTION);