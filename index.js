//start of the Backend
const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://joshuagermany:joshua2003@training.ygcsn6c.mongodb.net/?retryWrites=true&w=majority&appName=training')
.then(() => console.log('MongoDB is Connected...'))
.catch((err) => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})