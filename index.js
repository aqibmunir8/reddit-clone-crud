const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use( express.static( path.join(__dirname, "public")));

const { v4: uuidv4 } = require('uuid');


let posts = [
    {
        id: uuidv4(),
        title: "Weather in California",
        user: "Lious",
        content: "It's Tremendous changing in weather is happening because of Climate Change"
    },
    {
        id: uuidv4(),
        title: "US Election",
        user: "Reiner",
        content: "The upcoming US election is stirring up a lot of interest across the nation."
    },
    {
        id: uuidv4(),
        title: "Tech Innovations",
        user: "Alice",
        content: "Recent tech innovations are reshaping industries. From AI advancements to new energy solutions, the pace of change is incredible."
    }
];

app.listen(port, ()=>{
    console.log(`App is listening on Port ${3000}`);
})  

// --------------------------------------------------------------
app.get("/posts/new", (req, res)=>{
    res.render("new.ejs")
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id)
    let post = posts.find((p)=> id == p.id);
    console.log(post);
    res.render("readmore.ejs", { post });
});


app.post("/posts", (req, res)=>{
    let id = uuidv4();
    let {title, user, content} = req.body;
    posts.push({id, title, user, content});
    res.redirect("/posts")
})

// ------------------------------------------------------------------


app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
})

app.get("/", (req, res)=>{
    res.redirect("/posts")
})

app.get("/about", (req, res)=>{
    res.render("about.ejs");
})


// -----------------------------------------------------------------

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id == p.id);
    res.render("edit.ejs", {post});
})

app.patch("/posts/:id", (req, res)=>{
    let newContent = req.body.content;
    let {id} = req.params;
    let post = posts.find((p)=> id == p.id);
    post.content = newContent;
    res.redirect("/posts")
})

// ------------------------------------------------------------------

app.delete("/posts/:id/delete", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts")
})