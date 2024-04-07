//start of the Backend
const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
const config = require('./config/key')
const { User } = require('./models/User')
const { auth } = require('./middleware/auth')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB is Connected...'))
.catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('api/users/register', (req, res) => {
    //get the info for register from USER, and post it to DB
    const user = new User(req.body)
    user.save((err, userinfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

app.post('api/users/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, userInfo) => {
        if (!userInfo) {
            return res.json({
                loginSuccess: false,
                message: 'Sorry, the email does not exist.'
            })
        }
        else {
            userInfo.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.json({ 
                        loginSuccess: false,
                        massage: 'Sorry, password is incorrect.'
                    })
                }
                //if isMatch is true, generate the token
                userInfo.generateToken((err, userInfo) => {
                    if (err) return res.status(400).send(err)

                    //Store the token at the cookie
                    res.cookie("x_auth", userInfo.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: userInfo._id })
                })
            })
        }
    })
})

app.get('api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.name,
        image: req.user.image,
        role: req.user.role
    })
})

app.get('api/users/logout', auth, (req, res) => {
    //find the user from the DB
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).send({ success: true })
        })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})