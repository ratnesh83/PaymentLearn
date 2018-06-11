var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://root:abc123@ds153890.mlab.com:53890/mongoosetestarash',function(err){
    if(err){
        console.log(err);
    }else{
        console.log("db connected");
    }
});

var UserSchema = new mongoose.Schema({
    name:String,
    age:Number
});
// Custom mongoose method
UserSchema.methods.addLastName = function(lastName){
    this.name = this.name+" "+lastName;
    return this.name;
}
var User = mongoose.model('User',UserSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',function(req,res,nexts){
    res.json("welcome home");
});

app.get('/create-user',function(req,res,next){
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.json(user);
        }
    });
    res.json(user);
});

app.get('/:name',function(req,res,next){
    User.find({name:req.params.name},function(err,foundUser){
        if(foundUser){
            res.json(foundUser);
        }
        else{
            res.json("User doesn't exist");
        }
    });
    // User.findOne({name:req.params.name},function(err,foundUser){
    //     if(foundUser){
    //         res.json(foundUser);
    //     }
    //     else{
    //         res.json("User doesn't exist");
    //     }
    // })

    // User.findById({_id:req.params.id},function(err,foundUser){
    //     if(foundUser){
    //         res.json(foundUser);
    //     }
    //     else{
    //         res.json("User doesn't exist");
    //     }
    // })
});

app.listen(3001,function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Running on port 3001");
    }
});