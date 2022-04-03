const mongoose = require('mongoose');
const User = require("./user_model")
const {
    Schema
} = mongoose;

const URI = 'mongodb+srv://GregosisB:6re6b123@cluster0.mdmjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


mongoose.connect(URI || 'mongodb://localhost:27017/big-screen', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const movieSchema = new Schema({
    title: String,
    image: String,
    description: String,
    release_info: String,
    comment: [{
        type: String
    }]
})

const Movies = mongoose.model("Movies", movieSchema)

const makeMovie = async () => {
    const movie = new Movies({
        title: "Movie title",
        image: "Movie Image",
        description: "Movie Description",
        release_info: "Movie release info",

    })
    await movie.save()
}

// makeMovie()
//     .then((result) => {
//         console.log('result')   
//     }).catch((err) => {
//         console.log(err)   
//     });

module.exports = Movies