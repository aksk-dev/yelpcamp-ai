const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/people')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Connection error', err);
});

const personSchema = new mongoose.Schema({
    first: String,
    last: String
});


// virtuals should be declare before compiling the model and virtuals is used to create properties that are not stored in MongoDB
// using getters and setters methods
personSchema.virtual("fullname").get(function(){
    return `${this.first} ${this.last}`;
})


const Person = mongoose.model('Person', personSchema);


// mongoose middleware(pre and post hooks) are used to perform some operations before or after certain events like save, validate, remove, updateOne etc
// here we are using pre hook to log a message before saving a person document
personSchema.pre('save', async function(){
    console.log('About to save');
})