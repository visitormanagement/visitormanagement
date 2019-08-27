var express = require("express")
var dateTime = require('node-datetime');
var ejs=require('ejs');
var app = express();
var port = 3005;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Kousalya:ranju@kousi7@cluster0-qzlb7.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});
var nameSchema = new mongoose.Schema({
    name: String,
    email:String,
    age: String,
    gender:String,
    number:String,
    purpose:String,
    meet:String,
    from:String,
    category:String,
    intime:String
    
    });
var User = mongoose.model("User", nameSchema);
var nameSchema1 = new mongoose.Schema({
    name:String,
    email:String,
    purpose:String,
    meet:String,
    from:String,
    intime:String

});
var user1 = mongoose.model("user1",nameSchema1);
var nameSchema2 = new mongoose.Schema({
    feedback:String,
    comment:String,
    outtime:String
});
var user2 = mongoose.model("user2",nameSchema2);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/homepage.html");
});
app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/second.html",function(req,res){
    res.sendFile(__dirname + "/second.html");

})
app.get("/third.html",function(req,res){
    res.sendFile(__dirname + "/third.html");
})

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    date = Date.now();

    myData.save()
        .then(item => {
            res.sendFile(__dirname + "/welcome.html");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
app.post("/feed", (req, res) => {
    var myData2 = new user2(req.body);
   

    myData2.save()
        .then(item => {
            res.sendFile(__dirname + "/welcome.html");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
app.post("/addfile",function(req,res){
    var myData1 = new user1(req.body);
    myData1.save()
    .then(item =>{
        res.sendFile(__dirname + "/welcome.html");
    })
    .catch(err =>{
        res.status(400).send("unable to save database");
    })
});

app.use(express.static('public'));
app.get("/feedback",function(req,res){
    res.sendFile(__dirname + "/feed.html")
})
app.get('/admin',function(req,res){
    User.find({},function(err,users){
    if(err){
    console.log("Can not find cats");
    }
    else{
    res.render("home.ejs",{users:users});
    }
    }).sort({points:-1})
    })



app.listen(port, () => {
    console.log("Server listening on port " + port);
});




