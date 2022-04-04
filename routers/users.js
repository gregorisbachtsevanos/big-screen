const express = require('express');
const router = express.Router()
const passport = require("passport")
const catchingErrors = require("../utils/catchingErrors")
const user = require('../controllers/user_controller')

const topRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=46017593ecb210526b182311c582626b'

router.get('/', user.index)

router.get('/favourites', catchingErrors(user.favourites))

router.route('/register')
	.get(user.register)
	.post(catchingErrors(user.registerLogic))

router.route('/login')
	.get(user.login)
	.post(passport.authenticate('local', {
		failureFlash: true,
		failureRedirect: '/login'
	}), user.loginLogic)

router.get('/logout', user.logout)

module.exports = router