const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')

const app = express();

app.use(bodyparser.json());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/local');

var db = mongoose.connection;
db.on('error', ()=>console.log("Error in database"));
db.once('open', ()=>console.log("connected to database"))

app.post("/submit", (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone_no = req.body.phone_no;
    var date = req.body.date

    var data = {
        "name":name,
        "email":email,
        "phone_no":phone_no,
        "date":date
    }

    db.collection('appointment_form').insertOne(data, (err, collection)=>{
        if(err){
            res.send(err);
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('alert.html');
})

app.get('/', (req, res)=>{
    res.set({
        "ALLOW-access-ALLOW-Origin": '*'
    });
    return res.redirect('index.html');
}).listen(3030);
console.log('listening on port 3030')
