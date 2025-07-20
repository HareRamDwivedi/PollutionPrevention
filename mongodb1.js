const {MongoClient} = require('mongodb');
const client =new MongoClient("mongodb://127.0.0.1:27017")
async function dbconnect()
{
    const con = await client.connect();
    const db = con.db('database');
    return db.collection('Feedback Form')
}

module.exports=dbconnect;