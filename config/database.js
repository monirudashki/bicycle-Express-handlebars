const mongoose = require('mongoose');

//TODO change database by project -> "/booking-exam"
const connectionString = 'mongodb://localhost:27017/bicyclesProject';

module.exports = async (app) => {
    try {
        mongoose.connect(connectionString , {
           useUnifiedTopology: true,
           useNewUrlParser: true
        });
        console.log('databaseConnected');
    }catch(err) {
        console.error('Error database');
        console.error(err.message);
        process.exit(1);
    }
};