const mongoose = require('mongoose');
const Review = require('./reviews');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    tags: [String],
    averageRating: {
        type: Number,
        default: 0
    },
    sentimentScore: {
        type: Number,
        default: 0
    },
    sentimentLabel: {
        type: String,
        enum: ['positive', 'neutral', 'negative'],
        default: 'neutral'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

CampgroundSchema.index({ geometry: '2dsphere' });

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);
