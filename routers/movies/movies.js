const express = require('express')
const router = express.Router()
const movies = require('../../controllers/movie_controller')
const {
	isLoggedIn
} = require('../../utils/isLoggedIn');

router.post("/homepage/moviesLike", isLoggedIn, movies.likes)

router.post("/homepage/moviesComment", isLoggedIn, movies.comments)

module.exports = router