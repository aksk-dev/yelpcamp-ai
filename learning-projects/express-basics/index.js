

const express = require("express")
const app=express();
const path=require('path')

// handles form submissions (x-www-form-urlencoded)
app.use(express.urlencoded({extended  : true}));
// handles raw JSON data (API clients, frontend apps, etc.)
app.use(express.json());


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');



let comments = [
  { username: 'todd', comment: 'lol that is so funny' },
  { username: 'adii', comment: 'hii i am adii' },
  { username: 'jane', comment: 'nice to meet you!' },
  { username: 'alex', comment: 'great post!' }
];


app.get('/comments',(req,res) =>{
    res.render('index.ejs',{comments});
})
app.get('/comments/new',(req,res) =>{
    res.render('comments/new.ejs');
})

app.get('/comments/:id',(req,res) =>{
    const {id}=req.params;
    const comment=comments.find(c=>c.id===id);
    res.render('comments/show.ejs',{comment});
})
app.get('/comments/:id/edit',(req,res) =>{
    const {id}=req.params;
    const comment=comments.find(c=>c.id===id);
    res.render('comments/edit.ejs',{comment});
})

app.patch('comments/:id',(req,res) =>{
    // res.render("updated something")
    const {id}=req.params;
    const newcmntext=req.body.comment;
    const foundcomment=comments.find(c=>c.id===id);
    foundcomment.comment=newcmntext;
    res.redirect('/comments');
})

app.get('/tacos',(req,res) =>{
    res.send('GET/  tacos response');
})



app.post('/comments',(req,res) =>{
    const {username,comment}=req.body;
    comments.push({username,comment});
    res.redirect('/comments');
})
app.post('/tacos',(req,res) =>{
    const {meat,qty}=req.body;
    res.send(`ok here your ${meat}  ${qty}  tacos`);
})

app.delete('/comments/:id',(req,res) =>{
    const {id}=req.params;
    comments=comments.filter(c=>c.id!==id);
    res.redirect('/comments');
})

app.listen(3000, ()=>{
    console.log("listening on port 3000")
})