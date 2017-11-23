function AuthenticationMiddleware(){
    return function(req, res, next){
        if(req.isAuthenticated()){
            res.redirect('/');
        }
    }
}

function Authenticate(){
    passport.authenticate
}


app.get('/secret',passport.authenticate('jwt',{session:false}),function(req,res){
    console.log(req.isAuthenticated());
    res.json('Ok now, You can not see this without a token');
});

module.exports = AuthenticationMiddleware;