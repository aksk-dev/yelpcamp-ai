const mongoose=require('mongoose');
const Product=require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});


// const p=new Product({
//     name:'rubyfruit',
//     price:1.99,
//     category:'fruit'
// })

// p.save()
// .then(p=>{
//     console.log(p);
// })  
// .catch(e=>{
//     console.log(e);
// });

const seedProducts=[
    {name:'Fairy Eggplant',
    price:1.00,
    category:'vegetable'
    },
    {name:'Rubyfruit',
    price:1.99,
    category:'fruit'
    },
    {name:'Organic Whole Milk',
    price:2.99,
    category:'dairy'
    }
];

Product.insertMany(seedProducts)
.then(res=>{
    console.log(res);
})
.catch(e=>{
    console.log(e);
});