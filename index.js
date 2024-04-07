//start of the Backend
const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
const config = require('./config/key')
const { User } = require('./models/User')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB is Connected...'))
.catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
    //get the info for register from USER, and post it to DB
    const user = new User(req.body)
    user.save((err, userinfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})