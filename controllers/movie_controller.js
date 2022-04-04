const Movies = require('../model/movies_model');
const User = require('../model/user_model');
const axios = require('axios');
module.exports.likes = async (req, res) => {
	const {
		movieId
	} = req.body
	const user = await User.findById(req.user.id)
	axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=46017593ecb210526b182311c582626b', (req, res))
		.then(res => {
			return res.data.results
		})
		.then(async (data) => {
			for (movie of data)
				if (movie.id == movieId) {
					const {
						title,
						release_date,
						overview,
						poster_path
					} = movie
					const addMovie = await new Movies({
						title,
						release_info: release_date,
						description: overview,
						image: poster_path
					})
					addMovie.user = req.user._id
					await user.movies.push(addMovie)
					await user.save()
					await addMovie.save()
				}
		})
		.catch(error => console.error(error))

	req.flash('success', "Movie add to your list!")
	res.redirect('/')
}

module.exports.comments = async (req, res) => {
	const movie = await Movies.findById(req.body.movieId)
	movie.comment.push(req.body.comment)
	await movie.save()
	res.redirect('/favourites')
}