var express = require('express'),
    mongoose = require('mongoose'),
    http = require('http');

var app = express();

// CONFIG
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine','jade');
        
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + "/public"));
});

mongoose.connect("mongodb://localhost/intern1");

var CommentSchema = new mongoose.Schema({
    id: Number,
    content: String,
    time: Date
}),
    Comments = mongoose.model('Comments',CommentSchema);

//INDEX
app.get("/",function(req,res){
    Comments.find({},function(err,docs){
        res.render('comments',{comments:docs});
    });
});

//CREATE
app.post("/",function(req,res){
    var b = req.body;
    if(b.content.trim().length == 0){           
        console.log('No content');
        res.redirect("/");
    }else{
        new Comments({        
            content: b.content,
            time: new Date()
        }).save(function(err,comment){
            if(err) res.json(err);
            res.redirect("/");
        });
    }
});

//DELETE
app.delete("/:id",function(req,res){
    Comments.remove({_id: req.params.id}, 
    function(err){
        if(err) res.json(err);
        res.redirect('/');
    });
});

//CONSOLE
http.createServer(app).listen(app.get('port'),function(){
    console.log("Express server listening on port " + app.get('port'));
});


