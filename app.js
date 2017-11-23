const express = require('express');
const app = new express();

//_ or lodash will just be for a small utility function, everything
//passport related will be used in functions for user login and token validation
const bodyParse = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const tokenGenerator = require('./authentication/init.js').tokenGenerate;
app.use(passport.initialize());
app.use(bodyParse.urlencoded({
    extended:true
}))
//parse application/json
app.use(bodyParse.json());



app.get('/', function(req, res){
    res.send({message: "Express is up"})
})

app.post('/login', function(req, res){
    tokenGenerator(req, res);
})


app.get('/secret',passport.authenticate('jwt',{session:false}),function(req,res){
    console.log(req.isAuthenticated());
    res.json('Ok now, You can not see this without a token');
});



app.get('/secretDebug', function(req, res, next){
    console.log(req.get('Authorization'));
    next()
},function(req, res){
    res.json("debugging");
})


app.listen(3000, function(){
    console.log('Wow, Express is running now');
})
