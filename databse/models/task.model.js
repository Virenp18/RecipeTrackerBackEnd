const mongoose = require('mongoose');

// We will make the schema of LIST model
const StepsSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength : 1,
        trim : true // whatever data gets entered will gets trim from both end to remove whitespace
    },
    _listId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    is_completed : {
        type : Boolean,
        default : false
    }
});

const Steps = mongoose.model('steps', StepsSchema);

module.exports = {
    Steps
};