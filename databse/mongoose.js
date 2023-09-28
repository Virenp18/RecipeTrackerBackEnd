// This file will be handling the connection logic to the MongoDB database.

const mongoose = require('mongoose');
// So the mongoose is using bluebird for all the promise by default so we are setting it to global JS promise instead.
mongoose.Promise = global.Promise;
// Connecting MongoDB
// change the uri to of localhost to 127.0.0.1 as sometime it is not working
mongoose.connect(process.env.APPSETTING_DB_CONNECTION_STRING, {useNewUrlParser: true}).then(()=>{
    console.log(`Connected to MongoDB Database`);
}).catch((e)=>{
    console.log(`Unable to connect to MongoDB`);
    console.log(`Error => ${e}`);
});

module.exports = {
    mongoose
};