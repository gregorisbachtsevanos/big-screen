const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const movieSchema = new Schema({
    title: String,
    image: String,
    description: String,
    release_info: String,
    user: String,
    comment: [{
        type: String
    }]
})

const Movies = mongoose.model("Movies", movieSchema)

module.exports = Movies