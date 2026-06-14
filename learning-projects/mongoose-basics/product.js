const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Connection error', err);
});


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    onSale:{
        type:Boolean,
        default: false
    },
    qty:{
        online:{
            type: Number,
            default: 0
        },
        inStore:{
            type: Number,
            default: 0
        }
    },
    categories:{
        type: [String],
        default: ['cycling']
    },
    size:{
        type: String,
        enum: ['S','M','L']
    }       
});

const Product = mongoose.model('Product', productSchema);
const bike = new Product({ name: 'Mountain Bike', price: 599.99 });


bike.save()
.then(data => {
    console.log('Saved product:', data);
})
.catch(err => {
    console.error('oh no error', err);
});


// model instance methods

productSchema.methods.greet = function(){
    console.log(`-from ${this.name}`)
}


productSchema.methods.toggleOnSale = function(){
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function(newCat){
    this.categories.push(newCat);
    return this.save();
}

const findproduct=async ()=>{
    const foundProduct=await Product.findOne({name:'Mountain Bike'})
    // foundProduct.greet()
    console.log(foundProduct);
    await foundProduct.toggleOnSale()
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct);
}   

findproduct();



// model static methods

productSchema.statics.fireSale = function(){
    return this.updateMany({}, {onSale:true, price:0})
}

productSchema.fireSale().then(res=>{
    console.log(res);
})