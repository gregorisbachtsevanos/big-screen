const Movies = require('../model/movies_model');
const User = require('../model/user_model');

module.exports.index = async(req, res) => {
    res.render("homepage")
}

module.exports.favourites = async (req, res) => {
    const movies = await Movies.find({ user: req.user.id })
    
    res.render('favourites', { movies })
}

module.exports.registerLogic = async (req, res) => {
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
}

module.exports.register = (req, res) => {
    res.render("register")
}

module.exports.loginLogic = (req, res) => {
	req.flash('success', 'Welcome back!');
	res.redirect('/');
}

module.exports.login = (req, res) => {
    res.render("login")
}

module.exports.logout = (req, res) => {
    req.logout()
    req.flash("success", "Goodbye!")
    res.redirect('/')
}