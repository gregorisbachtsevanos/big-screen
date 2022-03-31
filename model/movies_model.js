const mongoose = require('mongoose');
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
    Image: String,
    Description: String,
    Release_Info: String
})

const Movies = mongoose.model("Movies", movieSchema)

const makeMovie = async () => {
    const movie = new Movies({
        title: "Movie title",
        Image: "Movie Image",
        Description: "Movie Description",
        Release_Info: "Movie release info"
    })
   await movie.save()
}

makeMovie()
    .then((result) => {
        console.log('result')   
    }).catch((err) => {
        console.log(err)   
    });

// module.exports = Movies