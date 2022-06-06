const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    data: String,
    type: String,
    lastEventId: String,
    origin: String
});

module.exports = mongoose.model('Message', messageSchema);