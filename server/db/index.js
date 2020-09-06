const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://jacoUser:jacoUser@socialcluster.euav8.azure.mongodb.net/SocialApp?retryWrites=true&w=majority', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db