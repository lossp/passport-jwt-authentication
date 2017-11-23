
const _ = require('lodash');
//_ or lodash will just be for a small utility function, everything
//passport related will be used in functions for user login and token validationconst bodyParse = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

let users = [
    {
        id: 1,
        name: 'lily',
        password: 'lilycollins'
    },
    {
        id: 2,
        name: 'test',
        password: 'test'
    }
];

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//ExtractJwt.fromAuthHeader() is replaced by ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'tasmanianDevil';
//The secretOrKey is the secret that our tokens will be signed with
let strategy = new JwtStrategy(jwtOptions,function(jwt_payload,next){
    console.log('Payload received', jwt_payload);
    //usually this would be a database call
    let user = users[_.findIndex(users, {id:jwt_payload.id})];
    if(user){
        next(null,user);
    }else{
        next(null,user);
    }
})


function tokenGenerate(req, res){
    if(req.body.name && req.body.password){
        let name = req.body.name;
        let password = req.body.name;
    }
    //usually this would be a database call
    let name = req.body.name;
    let user = users[_.findIndex(users,{name: name})];
    console.log(name);
    console.log(user)
    //find the user in users whose name = name
    if(!user){
        res.status(401).json({message:'no such user'})
    }

    if(user.password === req.body.password){
        //from now on, we will identify the user by the id
        // and the id is the only personalized value that goes
        // into our token
        let payload = {id: user.id};
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message: "ok", token: token});
    }else{
        res.status(401).json({message: "password did not match"})
    }
}

// function Authenticate(req, res, next){
//     passport.authenticate('jwt', {session:false})
//     if(req.isAuthenticated()){
//         return next()
//     }
//     res.redirect('/secret')
//     res.json('Ok now, You can not see this without a token');
// }





passport.use(strategy);


module.exports.tokenGenerate = tokenGenerate;
// module.exports.Authenticate = Authenticate;






