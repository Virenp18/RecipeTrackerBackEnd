const mongoose = require('mongoose');

// We will make the schema of LIST model
const RecipeSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength : 1,
        trim : true // whatever data gets entered will gets trim from both end to remove whitespace
    }
});

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = {
    Recipe
};