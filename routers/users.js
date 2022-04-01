const express = require('express');
const router = express.Router()
const Movies = require('../model/movies_model');
const Users = require('../model/user_model');
const { topRatedMovies, playingNowMovies } = require('../utils/request')

const topRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=46017593ecb210526b182311c582626b'

router.get('/homepage', (req, res) => {
    res.render("homepage")
})

router.get('/register', (req, res) => {
    res.render("register")
})

router.get('/login', (req, res) => {
    res.render("login")
})

router.post('/homepage', async (req, res) => {
	await new Users(req.body.user).save()
    res.redirect('/bigscreen/homepage')
})

module.exports = router