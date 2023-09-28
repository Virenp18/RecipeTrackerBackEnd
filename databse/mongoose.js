// This file will be handling the connection logic to the MongoDB database.

const mongoose = require('mongoose');
// So the mongoose is using bluebird for all the promise by default so we are setting it to global JS promise instead.
// mongoose.Promise = global.Promise;
// Connecting MongoDB

// For Production Use

mongoose.connect("mongodb+srv://varendpratap:5OwCuMqn3iRnHQ33@cluster0.dtrjoqt.mongodb.net/RecipeMaker?retryWrites=true&w=majority", {useNewUrlParser: true}).then(()=>{
    console.log(`Connected to MongoDB Database`);
}).catch((e)=>{
    console.log(`Unable to connect to MongoDB`);
    console.log(`Error => ${e}`);
});

// For Production Use
// change the uri to of localhost to 127.0.0.1 as sometime it is not working

// mongoose.connect(process.env.APPSETTING_DB_CONNECTION_STRING_LOCAL, {useNewUrlParser: true}).then(()=>{
//     console.log(`Connected to MongoDB Database`);
// }).catch((e)=>{
//     console.log(`Unable to connect to MongoDB`);
//     console.log(`Error => ${e}`);
// });

module.exports = {
    mongoose
};