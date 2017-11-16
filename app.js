var express = require('express');
var app = express();
var path = require("path");
var firebase = require('firebase');
var dotenv = require('dotenv-safe').load();
var bodyParser = require('body-parser');

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var config = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID
};

var fire = firebase.initializeApp(config);

var profiles = [];
var firebaseProfileRef = fire.database().ref('/profile/');
firebaseProfileRef.on('value', (snapshot) =>{
  profiles = snapshot.val();
});

// Route for handling login requests
app.post('/profiles', function(req, res, next){
    //get username from database if username and password from req.body match one in db
    var dbresponse = 'jdoe123';
    res.json({user: dbresponse});
});

//sample routes to show how routes are created and rendered
//note the http method is specified here (get, post, etc)
//req = request object, res = response object, next = error catcher / callback function
app.get('/', function(req,res,next){
    res.render('home');
});

app.get('/productList', function(req,res,next){
    res.render('productList');
});

app.get('/profiles', function(req, res, next){
    res.render('profiles', {pageTitle: "Profiles", profiles: profiles});
});

//demo how request parameters are used
app.get('/params/:text', function(req, res, next){
    res.send(req.params.text);
});

hostport = 8080;
if (process.env.NODE_ENV === 'PRODUCTION'){
    hostport = 80;
}

app.listen(hostport, function(){
    console.log("PinLab is running on port " + hostport.toString());
});
