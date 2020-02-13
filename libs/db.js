const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<password>@cluster0-niqji.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });



client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log(collection);
  client.close();
});

module.exports = client;
