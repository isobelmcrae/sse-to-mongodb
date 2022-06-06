# SSE to MongoDB

A simple script that listens for events from an SSE connection and then send them to a MongoDB database. Made for the [Squiggle API](https://api.squiggle.com.au/) but can be adapted to other SSE APIs.


## Setup

In index.js change this line to include the link to the SSE connection you want to use:
```
const eventSource = new EventSource('your-link')
```
You should also edit the models in the models folder to fit your API, and the event listeners to fit your API.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`MONGODB_LINK` - your MongoDB connection link, should look something like:
```
mongodb+srv://<username>:<password>@your-db.example.mongodb.net/test
```


