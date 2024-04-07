const { User } = require('../models/User')

let auth = (req, res, next) => {
    //get the token called 'x_auth' from the cookie
    let token = req.cookie.x_auth

    //find the user in DB
    User.findByToken(token, (err, user) => {
        if (err) throw err
        if (!user) return res.json({
            isAuth: false,
            error: true
        })
        req.token = token
        req.user = user
        next()
    })
}

module.exports = { auth }