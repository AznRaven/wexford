const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true 
    },
    residentName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    unitNumber: {
        type: String,
        enum: ['3250', '3254', '3258', '3262', '3266', '3270', '1110', '1114'],
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
