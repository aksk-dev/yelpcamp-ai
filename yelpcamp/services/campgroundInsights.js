const Review = require('../models/reviews');

async function updateCampgroundInsights(campground) {
    await campground.populate('reviews');

    const reviews = campground.reviews;
    if (!reviews.length) {
        campground.averageRating = 0;
        campground.sentimentScore = 0;
        campground.sentimentLabel = 'neutral';
        await campground.save();
        return campground;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const totalSentiment = reviews.reduce((sum, review) => {
        return sum + (review.sentiment ? review.sentiment.score : 0);
    }, 0);
    const sentimentCounts = reviews.reduce((counts, review) => {
        const label = review.sentiment ? review.sentiment.label : 'neutral';
        counts[label] += 1;
        return counts;
    }, { positive: 0, neutral: 0, negative: 0 });

    campground.averageRating = Number((totalRating / reviews.length).toFixed(1));
    campground.sentimentScore = Number((totalSentiment / reviews.length).toFixed(3));
    campground.sentimentLabel = Object.entries(sentimentCounts)
        .sort((left, right) => right[1] - left[1])[0][0];

    await campground.save();
    return campground;
}

async function refreshCampgroundInsightsById(campgroundId) {
    const Campground = require('../models/campground');
    const campground = await Campground.findById(campgroundId).populate('reviews');
    if (!campground) return null;
    return updateCampgroundInsights(campground);
}

module.exports = {
    updateCampgroundInsights,
    refreshCampgroundInsightsById
};
