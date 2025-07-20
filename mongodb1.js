const {MongoClient} = require('mongodb');
const client =new MongoClient("##########")
async function dbconnect()
{
    const con = await client.connect();
    const db = con.db('database');
    return db.collection('Feedback Form')
}

module.exports=dbconnect;
