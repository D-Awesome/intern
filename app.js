var express = require('express'),
    mongoose = require('mongoose'),
    http = require('http'),
    swig  = require('swig');

var app = express();

// CONFIG
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views'); 
    app.set('view engine','html');
        
    app.engine('html',swig.renderFile);

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + "/public"));
});

mongoose.connect("mongodb://localhost/intern1");

var CommentSchema = new mongoose.Schema({
    content: String,
    time: Date
}), 
    Comments = mongoose.model('Comments',CommentSchema);


//INDEX
app.get("/",function(req,res){
    res.render('index',{ pagename:'Comments - Task 2'});     
});

//READ
app.get("/api/comment",function(req,res){
    Comments.find({},function(err,comments){
        if (err) res.send(err);
        res.json(comments);
    });
});

//CREATE
app.post("/api/comment",function(req,res){
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
            Comments.find({},function(err,comments){
                if(err) res.json(err);
                res.json(comments);
            });
        });
    }
});

//DELETE
app.delete("/api/comment/:commentId",function(req,res){
    Comments.remove({_id: req.params.commentId}, 
    function(err,comment){
        if(err) res.json(err);
        Comments.find({},function(err,comments){
            if(err) res.json(err);
            res.json(comments);
        });
    });
});


//CONSOLE
http.createServer(app).listen(app.get('port'),function(){
    console.log("Express server listening on port " + app.get('port'));
});


