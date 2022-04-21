const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());


// userId: dbuser1
// password:  <password>


const uri = "mongodb+srv://dbuser1:dJJokUkvwGIKkmm8@cluster0.xwpgf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const userCollection = client.db("foodExpress").collection("users");
        const user ={name:'Mohona nodi', email:'nodi@gmail.com'};
        const result = await userCollection.insertOne(user);
        console.log(`User inserted with id: ${result.insertedId}`);

    }
    finally{
        // await client.close();
    }
}

run().catch(console.log.dir);


/* client.connect(err => {
  const collection = client.db("foodExpress").collection("users");
  console.log('db connected');
  // perform actions on the collection object
  client.close();
}); */



app.get('/', (req, res) =>{
    res.send('Runing My Node CRUD Server');
});

app.listen(port, () =>{
    console.log('CRUD Server is runing');
})