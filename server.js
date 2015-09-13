var express = require("express");
var morgan = require("morgan");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.PORT || 8888;

var config = require("./config.js");
var Post = require("./model/post.js");




mongoose.connect(config.dbtest, function(err){
  if(err)
    console.log(err);
  console.log("Db conn success.");
});
var app = express();



app.use(express.static(path.join(__dirname, "/public")));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var router = express.Router();


router.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

router.get("/altindex", function(req,res){
  res.sendFile(path.join(__dirname, "/public/indextwo.html"));
});

router.get("/posts", function(req, res){
  Post.find({}, function(err, data){
    if(err)
      console.log(err);
    res.send(data);
  });
});


router.post("/posts", function(req,res){
  var newPost = new Post();
  newPost.title = req.body.title;
  newPost.content = req.body.content;
  newPost.save(function(err, data){
    if(err)
      console.log(err);
    console.log("Success.  New post added. %s", data);
    //res.redirect("/altindex");
  });
});



app.use(router);

app.listen(port, function(){
  console.log("Listening on port: %s", port);
});
