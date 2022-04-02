const axios = require('axios');
const express = require('express')
const {
	date
} = require('joi')
const mongoose = require('mongoose')
const Movies = require('../../model/movies_model');
const User = require('../../model/user_model');
const { isLoggedIn } = require('../../utils/middleware');

const router = express.Router()

router.post("/homepage/moviesLike", isLoggedIn,  async (req, res) => {
	const {
		movieId
	} = req.body
	axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=46017593ecb210526b182311c582626b', (req, res))
		.then(res => { return res.data.results })
		.then(async (data) => {
			for(movie of data)
				if(movie.id == movieId){
					const { title, release_date, overview, poster_path } = movie
					const addMovie = await new Movies({title, release_info:release_date, description:overview, image: poster_path})
					addMovie.user = req.user._id
					console.log(addMovie)
					await addMovie.save()
				}
		})
		.catch(error => console.error(error))

	res.redirect('/')
})

router.post("/homepage/moviesComment", isLoggedIn,  async (req, res) => {
	const movie = await Movies.findById(req.body.movieId)
	console.log(movie)
})

module.exports = router