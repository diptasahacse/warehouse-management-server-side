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


const run = async () => {
  try {
    await client.connect();
    const productsCollection = client.db('inventoryManagement').collection('products');

    // POST a Product
    app.post('/products', async(req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product)

      res.send(result)
      // console.log(product)

    })

  }
  finally {
    // await client.close();
  }

}
run().catch(console.dir)

// Port listening

app.listen(port, () => {
  console.log("Listening..")
})