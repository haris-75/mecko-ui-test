var mongoose =  require('mongoose');

var fieldSchema = mongoose.Schema({
    type : String,
    checked : Boolean,
    alias : String,
    field : String,
    accept_empty : Boolean
});
module.exports = fieldSchema;