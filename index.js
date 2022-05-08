// import or require
const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// App
const app = express();

// Middleware
const cors = require('cors');
const { ObjectID } = require('bson');
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
    const blogsCollection = client.db('inventoryBlogs').collection('blogs');

    // POST a Product
    app.post('/products', async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product)

      res.send(result)
      // console.log(product)

    })
    // GET all products for all or specific user
    app.get('/products', async (req, res) => {
      const email = req.query.email;
      
      const query = email ? { email } : {};
      const cursor = productsCollection.find(query);
      const allProducts = await cursor.toArray();

      res.send(allProducts)
    })
    // GET all products for all or specific user
    app.get('/blogs', async (req, res) => {
      const query = {};
      const cursor = blogsCollection.find(query);
      const allBlogs = await cursor.toArray();

      res.send(allBlogs)
    })
    // GET single Product by ID
    app.get('/products/:id', async (req, res) => {
      const productId = req.params.id;
      const query = { _id: ObjectId(productId) };

      const result = await productsCollection.findOne(query);
      res.send(result)

    })
    
    // Update a Product
    app.put('/products/:id', async (req, res) => {
      const productId = req.params.id;
      const updatedProductData = req.body;
      const filter = { _id: ObjectId(productId) }
      const options = { upsert: true };

      const updateProductsDocs = {
        $set: {
          email: updatedProductData.email,
          productName: updatedProductData.productName,
          productDes: updatedProductData.productDes,
          productPrice: updatedProductData.productPrice,
          productQuantity: updatedProductData.productQuantity,
          productImageLink: updatedProductData.productImageLink,
          supplierName: updatedProductData.supplierName
        }

      }
      
      const result = await productsCollection.updateOne(filter, updateProductsDocs, options);
      res.send(result)

    })

    // Delete a Product
    app.delete('/products/:id', async (req, res) => {
      const productId = req.params.id;
      const query = { _id: ObjectId(productId) }
      result = await productsCollection.deleteOne(query)
      res.send(result)

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