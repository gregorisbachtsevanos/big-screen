const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const app = express()

const usersRouter = require('./routers/users')
const moviesRouter = require('./routers/movies/movies')

const PORT = process.env.PORT || 3000;
const URI = 'mongodb+srv://GregosisB:6re6b123@cluster0.mdmjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


mongoose.connect(URI || 'mongodb://localhost:27017/big-screen', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => console.log("Database connected"))

app.engine("ejs", ejsMate)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/bigscreen', usersRouter)
app.use("/bigscreen", moviesRouter)

app.listen(PORT, () => console.log("Server is starting at " + PORT))