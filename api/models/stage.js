const mongoose = require("mongoose"), Schema = mongoose.Schema;
const fieldSchema = require("./field");

const stageSchema = mongoose.Schema({
    _id: String,
    name: String,
    job_id: {type: Schema.Types.ObjectId, ref: 'Job'},
    stage_type: String,
    sub_type: String,
    additional_attributes : Schema.Types.Mixed,
    default_schema : [fieldSchema],
    user_selected_schema : [fieldSchema],
    inbound : [String],
    outbound : [String],
    status : String,
    user_id : Schema.Types.ObjectId,
    stage_attributes : {},
    comment : String,
    data : [],
    exception :String
});
module.exports = stageSchema;
