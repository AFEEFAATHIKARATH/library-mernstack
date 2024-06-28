const mongoose = require('mongoose');
mongoose.set('strictQuery',false)
mongoose.connect(process.env.mongo_url)
const connection = mongoose.connection
connection.on('connected', () => {
    console.log('mongo db connection successfull');
})
connection.on('error', (err) => {
    console.log('mongo db connection failed');
})
module.exports = connection;
