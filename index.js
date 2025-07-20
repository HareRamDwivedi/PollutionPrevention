const express = require ('express');
const dbcon = require('./mongodb');
const dbconnect = require('./mongodb1');
const ObjectId = require('mongodb').ObjectId;
const app = express();
app.set('view engine','ejs');

app.get('',async(req,res)=>
{
        let collection = await dbcon();
        let rs = await collection.find({}).toArray();
        res.render('test',{rs})
});

app.get('/register',async (req,res)=>
{
    if(req.query.b1!=null)
    {   
        let uname = req.query.t1;
        let uemail = req.query.t2;
        let unumber = req.query.t3;
        let upass = req.query.t4;
        let cupass = req.query.t5;
        if(upass===cupass)
        {
        let collection = await dbcon();
        let r = await collection.insertOne({'User Name':uname,'Email Id':uemail,'Phone Number':unumber,'Password':upass,'Conform Password':cupass});
        if(r.acknowledged==true)
        {
            let msg = 'Record Inserted';
            res.render('home',{msg});
        }
        else
        {
            let msg ='Record not Inserted';
            res.render('register',{msg});
        }
    }
    else {
        let msg = " Re enter both the password"
        res.render('register',{msg});
    }
    }
    else
    {
        let msg ='';
        res.render('register',{msg});
    }
});

// app.get('/pahale',async(req,res)=>
// {
//     if(req.query.b2!=null)
//     {
//         let name = req.query.t6;
//         let pass = req.query.t7;
//         let numbers = req.query.t7;

//         let collections = await dbcon();
//         let r2 = await collections.find({'User Name':name,'Phone Number':numbers,'Password':pass}).toArray();
//         if(r2!=null)
//         {
//             res.render('home',{});
//         }
//         else{
//             let msg = 'User not found';
//             res.render('pahale',{msg});
//         }
//     }
// });

app.get('/feedback',async(req,res)=>
{
    if(req.query.submitf!=null)
    {
    let fname = req.query.opname;
    let fmail = req.query.opemail;
    let faddr = req.query.opaddress;    
    let fthought = req.query.commetn;

    let collection = await dbconnect();
    let r1 = await collection.insertOne({'Name':fname,'Email':fmail,'Address':faddr,'Openion':fthought});
    if(r1.acknowledged==true)
        {
            let msg = 'Feedback Recieved';
            res.render('home',{msg});
        }
        else
        {
            let msg ='No Feedback has been given';
            res.render('home',{msg});
        }
    }
    else{
        let msg='';
        res.render('home',{msg});
    }

});

app.get('/uid',async(Req,res)=>
{
    let uid = req.query.uid;
    let collection = await dbconnect();
    let rs = await collection.find({'_id':new ObjectId(uid)}).toArray();
    res.render('update',{rs});
})

app.listen(7000,()=>console.log("Server is Running"));