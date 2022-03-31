const express = require('express');
const fetch = require('node-fetch');

const topRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=46017593ecb210526b182311c582626b'
const playingNow = 'https://api.themoviedb.org/3/movie/now_playing?api_key=46017593ecb210526b182311c582626b'

const topRatedMovies = (data, callback) => {
    fetch(topRated)
        .then((res) => res.json())
        .then((res) => console.log(res))
}

const playingNowMovies = (data, callback) => {
    fetch(playingNow)
        .then((res) => res.json())
        .then((res) => console.log(res))
}

topRatedMovies()
playingNowMovies()