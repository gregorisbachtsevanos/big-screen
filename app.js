const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport')
const localStrategy = require('passport-local')

const usersRouter = require('./routers/users')
const moviesRouter = require('./routers/movies/movies')
const User = require('./model/user_model');
const error = require('./utils/error')

const URI = 'mongodb+srv://GregosisB:6re6b123@cluster0.mdmjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const sessionConfig = {
    secret: "secretcodeconfig",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

mongoose.connect(URI || 'mongodb://localhost:27017/big-screen', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => console.log("Database connected"))

const app = express()
const PORT = process.env.PORT || 3000;

app.engine("ejs", ejsMate)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.user = req.user
    next()
})

app.use('/', usersRouter)
app.use("/", moviesRouter)

app.all('*', (req, res, next) => {
    next(new error("Page not found!", 404))
})

app.use((err, req, res, next) => {
    const {
        status = 500
    } = err
    if (!err.message) err.message = "Something went wrong"
    res.status(status).render('404', {
        err
    })
})

app.listen(PORT, () => console.log("Server is starting at " + PORT))