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

// 2. NEW Route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// 3. CREATE Route
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }

    });
});

// 4. SHOW Route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);