const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const postRouter = require('./routes/post-router')
var path = require('path');
const app = express()
const apiPort = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../client/build')));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})
app.use('/api', postRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))