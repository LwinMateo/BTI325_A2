/*************************************************************************
* BTI325– Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Lwin Yonal Mateo Lopez_______________ Student ID: 134710201__________ Date: 10-08-2022____
*
* Your app’s URL (from Cyclic) : https://alive-fox-vest.cyclic.app________________________________
*
*************************************************************************/

var express = require('express');
var app = express();

var path = require('path');

var data_service = require('./data-service.js');


var HTTP_PORT = process.env.HTTP_PORT || 8080;



function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/home.html'));
})

app.get('/about', function(req, res){
    res.sendFile(path.join(__dirname, 'views/about.html'));
})


// additional routes
app.get('/employees', function(req, res){
    
   data_service.getAllEmployees().then((data)=>{
        res.json(data);
   });
});


app.get('/managers', function(req, res){
    
    data_service.getManagers().then((data) => {
        res.json(data);
      });
});

app.get('/departments', function(req, res){
    
    data_service.getDepartments().then((data) => {
        res.json(data);
      });
})


app.get('/*', function(req, res){
    
    //res.status(404).send("Page Not Found");
    res.status(404).sendFile(path.join(__dirname, 'views/error.html'));
})


// to get connected to server
//app.listen(HTTP_PORT, onHttpStart);
data_service.initialize().then(function(){
    app.listen(HTTP_PORT, onHttpStart);
}).catch(function(err){
    console.log('Initilization Failed! ' + err);
});