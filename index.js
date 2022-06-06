var EventSource = require('eventsource')
require('dotenv').config()
const eventSource = new EventSource('https://api.squiggle.com.au/sse/test')
const mongoose = require('mongoose');

mongoConnect().catch(err => console.log(err));

async function mongoConnect() {
    await mongoose.connect(process.env.MONGODB_LINK)
}
const scoreSchema = new mongoose.Schema({
    data: String,
    type: String,
    lastEventId: String,
    origin: String
})
const Score = mongoose.model('Score', scoreSchema);

eventSource.addEventListener('score', function(e) {
    console.log(e)
    const messageScore = new Score({
        data: e.data.timestr,
        type: e.type,
        lastEventId: e.lastEventId,
        origin: e.origin,
    })

    async function save() {
        await messageScore.save()
    }
    save()
})
eventSource.onmessage = (e) => {
    console.log(e)

    const messageScore = new Score({
        data: e.data,
        type: e.type,
        lastEventId: e.lastEventId,
        origin: e.origin
    })

    async function save() {
        await messageScore.save()
    }

    save()
}