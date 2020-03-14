var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    app         = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));
mongoose.connect("mongodb://localhost/BlogPost", {useNewUrlParser: true, useUnifiedTopology: true});

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
var Blog = mongoose.model("Blog", blogSchema);

// RESTful Routes
// 1. INDEX
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, allBlogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("index", {allBlogs: allBlogs});
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);