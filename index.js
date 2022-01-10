const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;



const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b0pni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
        await client.connect();
        console.log("database successfully connected");
        const database = client.db('masterChefDB');
        const servicesCollection = database.collection('services');
       
       



        // GET API for Services
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        });

     

        // POST API for services
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service);

            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result)
        });

        



    }

    finally {

        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello products')
})

app.listen(port, () => {
    console.log(`listening at${port}`)
})