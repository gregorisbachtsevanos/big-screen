const axios = require('axios');
const express = require('express')
const {
	date
} = require('joi')
const mongoose = require('mongoose')
const Movies = require('../../model/movies_model')

const router = express.Router()

router.post("/homepage/movies", async (req, res) => {
	const {
		movieId
	} = req.body
	axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=46017593ecb210526b182311c582626b', (req, res))
		.then(res => { return res.data.results })
		.then(async (data) => {
			for(movie of data)
				if(movie.id == movieId){
					const { title, release_date, overview, backdrop_path } = movie
					await new Movies({title, release_info:release_date, description:overview, image: backdrop_path}).save()
				}
		})
		.catch(error => console.error(error))

	res.redirect('/bigscreen/homepage')
})

module.exports = router