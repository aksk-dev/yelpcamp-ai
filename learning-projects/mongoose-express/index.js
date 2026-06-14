const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');


const Product=require('./models/product');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(() => {
    console.log('Connected to Mongo connection');
})
.catch(err => {
    console.error('oh no mongo Connection error', err);
});


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//below line  is middleware that parses incoming requests into req.body
app.use(express.urlencoded({extended:true}));
// for overriding methods in forms from post to put or delete
app.use(methodOverride('_method'));



app.get('/products',async(req,res)=>{
    const {category}=req.query;
    if(category){
        const products=await Product.find({category});
        res.render('products/index',{products});
    }else{
        // otherwise show all products
        const products=await Product.find({});
        res.render('products/index',{products});
    }
});


app.get('/products/new',(req,res)=>{
    res.render('products/new')
})

app.post('/products',async(req,res)=>{
    // console.log(req.body);
    const newProduct=new Product(req.body);
    await newProduct.save();
    res.redirect('/products');
})

app.get('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const product=await Product.findById(id);
    console.log(product);
    res.render('products/show',{product});

})
app.get('/products/:id/edit',async(req,res)=>{
    const {id}=req.params;
    const product=await Product.findById(id);
    res.render('products/edit',{product});
})



app.put('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    res.redirect(`/products/${product._id}`);
})


app.delete('/products/:id',async(req,res)=>{
    const{id}=req.params;
    const deletedProduct=await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
app.listen(3000,()=>{
    console.log('App is listening on port 3000');
})