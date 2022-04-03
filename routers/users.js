const express = require('express');
const passport = require("passport")
const router = express.Router()
const Movies = require('../model/movies_model');
const User = require('../model/user_model');
const errorsCatch = require("../utils/errorsCatch")
const {
    topRatedMovies,
    playingNowMovies
} = require('../utils/request')

const topRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=46017593ecb210526b182311c582626b'

router.get('/', (req, res) => {
    res.render("homepage")
})

router.get('/favourites', errorsCatch(async (req, res) => {
    const movies = await Movies.find({ user: req.user.id })
    // console.log(movies )
    res.render('favourites', { movies })
}))

router.get('/register', (req, res) => {
    res.render("register")
})

router.post('/register', errorsCatch(async (req, res) => {
    try {
        const {
            fullname,
            username,
            type,
            email,
            password
        } = req.body
        const user = new User({
            fullname,
            username,
            type,
            email
        })
        const newUser = await User.register(user, password)
        req.login(newUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to BigScreen');
            res.redirect('/')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}))

router.get('/login', (req, res) => {
    res.render("login")
})

router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
}), (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/');
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash("success", "Goodbye!")
    res.redirect('/')
})

module.exports = router