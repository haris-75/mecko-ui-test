const mongoose = require('mongoose');
const stageSchema = require("./stage");

const jobSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        default: 'new_job'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "waiting"
    },
    stages: [stageSchema],
    canvas: {
        nodes: [],
        edges: []
    },
    comment: String,
    progress: String
});

module.exports = mongoose.model('Job', jobSchema);