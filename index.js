// import required modules
var EventSource = require('eventsource')
const mongoose = require('mongoose');
require('dotenv').config()

// Sets eventsource to SSE API link
const eventSource = new EventSource('https://api.squiggle.com.au/sse/test')

// import models for inserting documents into the database
const Message = require('./models/message.js')
const Score = require('./models/score.js')

// connects to the database
mongoConnect().catch(err => console.log(err));

// connection function to connect to the MongoDB database
async function mongoConnect() {
    await mongoose.connect(process.env.MONGODB_LINK)
}

// Event listener for 'score' event
eventSource.addEventListener('score', function(e) {
    console.log(e)
    const score = new Score({
        gameid: e.data.gameid,
        type: e.type,
        scoretype: e.data.type,
        team: e.data.team,
        complete: e.data.complete,
        timestr: e.data.timestr,
        origin: e.origin
    })

    async function save() {
        await score.save()
    }
    save()
})

// Event listener for 'message' event
eventSource.addEventListener('message', function(e) {
    console.log(e)
    const message = new Message({
        data: e.data,
        type: e.type,
        lastEventId: e.lastEventId,
        origin: e.origin
    })

    async function save() {
        await message.save()
    }

    save()
})
