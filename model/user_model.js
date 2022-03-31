const mongoose = require('mongoose');
const validator = require('validator')
const {
    Schema
} = mongoose;

const userSchema = new Schema({
    fullaname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minLength: 4,
        unique: true,
        lowercase: true,
        trim: true,

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
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

const Users = mongoose.model("Users", userSchema)

module.exports = Users