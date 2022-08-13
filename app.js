const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

mongoose.connect('mongodb://localhost/contactSchool');
const port = 8000; 

//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))
app.use(express.urlencoded())   // this will  help to encode the data received

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')  //set the template engine
app.set('views', path.join(__dirname, 'views'))  // Set the views directory

//ENDPOINTS
app.get('/', (req, res) =>{
    const params = {} // we have use this title and content in index.pug file
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) =>{
    const params = {} // we have use this title and content in index.pug file
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) =>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, () =>{               // app listen the port number and run on thar port
    console.log(`This application started successfully on port ${port}`);
})
