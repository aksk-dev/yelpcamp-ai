const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    body: String,
    rating: Number,
    sentiment: {
        label: {
            type: String,
            enum: ['positive', 'neutral', 'negative'],
            default: 'neutral'
        },
        score: {
            type: Number,
            default: 0
        },
        confidence: {
            type: Number,
            default: 0
        }
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
