var express = require('express');

var app = express();

function enteringMexicoBorder(req,res,next){
    if(req.params.name === "ok"){
        next();
    }else{
        res.redirect("www.google.com");
    }
}

app.get('/mexico/:name',enteringMexicoBorder, function(req,res,next){
    res.json("ok");
});

app.listen(3000,function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Running on port 3000");
    }
});