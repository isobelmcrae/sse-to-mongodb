const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    gameid: Number,
    type: String,
    scoretype: String,
    team: Number,
    complete: Number,
    timestr: String,
    lasteventid: Number,
    origin: String
});

module.exports = mongoose.model('Score', scoreSchema);