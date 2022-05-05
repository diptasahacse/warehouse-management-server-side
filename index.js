// import or require
const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


// App
const app = express();

// Middleware
const cors = require('cors');
app.use(cors())
app.use(express.json())


// Port
const port = process.env.PORT || 5000;

// API
app.get('/', (req, res) => {
    res.send('Ready...');
})






const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@cluster0.iolad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('DB is connected')
  client.close();
});


// Port listening

app.listen(port, () => {
    console.log("Listening..")
})