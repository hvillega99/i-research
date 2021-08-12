const mongoose = require('mongoose');

const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    poolSize: 4
}

mongoose.connect(process.env.MONGODB_URI, config)
.then(() => console.log('DB connnection successful!'))
.catch(err => {
    console.error.bind(console, 'MongoDB connection error:')
});

const db = mongoose.connection;

module.exports = db;