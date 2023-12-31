const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const cors = require('cors');
const colors = require('colors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pb98izq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();
        const carCollection = client.db('assignment-11').collection('carCollections')
        const toyCollection = client.db('assignment-11').collection('toyCarCollection')
        const policeCarCollection = client.db('assignment-11').collection('policeCarCollection')
        const addToyCarCollection = client.db('assignment-11').collection('addToyCar');
        const addCarCollection = client.db('assignment-11').collection('addToToy')

        

        app.get('/regu-spo', async (req, res) => {
            const result = await carCollection.find({}).toArray()
            res.send(result)
        });

        app.get('/regu-spo/:id', async (req, res) => {
            const id = req.params.id;
            const result = await carCollection.find({}).toArray();
            const selectedCar = result.find(car =>car._id == id);
            res.send(selectedCar)
        });

        app.get('/toy-car', async (req, res) => {
            const result = await toyCollection.find({}).toArray()
            res.send(result)
        });

        app.get('/toy-car/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const result = await toyCollection.find({}).toArray();
            const selectedCar = result.find(car =>car._id == id);
            res.send(selectedCar)
        });

        app.get('/police-car', async (req, res) => {
            const result = await policeCarCollection.find({}).toArray()
            res.send(result)
        })

        app.get('/police-car/:id', async (req, res) => {
            const id = req.params.id;
            const result = await policeCarCollection.find({}).toArray();
            const selectedCar = result.find(car =>car._id == id);
            res.send(selectedCar)
        });

        app.get('/addToToy',async(req,res) =>{
            let qurey = {};
            if(req.qurey?. email){
                qurey={email: req.query.email}
            }
            const result = await addCarCollection.find(qurey).toArray();
            res.send(result);
        })

        app.post('/addToToy', async(req, res)=>{
            const addToy= req.body;
            console.log(addToy);
            const result = await addCarCollection.insertOne(addToy);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!".cyan);
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// DNrmFqDEiH3HogZl
// assignment-11