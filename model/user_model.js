const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const Movies = require('./movies_model');
const {
    Schema
} = mongoose;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    type:{
        type: String,
        required: true, 
        emit: ['typeA', 'typeB']
    },
    movies: [{
        type:Schema.Types.ObjectId,
        ref: "movies"
    }]
})

userSchema.plugin(passportLocalMongoose)

const Users = mongoose.model("Users", userSchema)

module.exports = Users