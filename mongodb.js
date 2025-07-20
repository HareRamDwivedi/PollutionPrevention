const {MongoClient} = require('mongodb');
const client =new MongoClient("###############")
async function dbcon()
{
    const con = await client.connect();
    const db = con.db('database');
    return db.collection('data1')
}


module.exports=dbcon;
