const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MovieApp')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Connection error', err);
});


const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema);
// const amadeus = new Movie({ title: 'Amadeus', year: 1984, score: 9.2, rating: 'R' });


Movie.insertMany([
    { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
    { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
    { title: 'Inception', year: 2010, score: 8.8, rating: 'PG-13' },
    { title: 'The Godfather', year: 1972, score: 9.2, rating: 'R' }
])
.then(data => {
    console.log('Inserted movies:', data);
    console.log('All done!');
})