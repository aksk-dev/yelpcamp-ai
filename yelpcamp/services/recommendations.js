function tagOverlapScore(sourceTags = [], candidateTags = []) {
    const source = new Set(sourceTags.map(tag => tag.toLowerCase()));
    return candidateTags.reduce((score, tag) => {
        return source.has(String(tag).toLowerCase()) ? score + 2 : score;
    }, 0);
}

function priceSimilarityScore(sourcePrice, candidatePrice) {
    const difference = Math.abs(Number(sourcePrice || 0) - Number(candidatePrice || 0));
    if (difference <= 5) return 3;
    if (difference <= 15) return 2;
    if (difference <= 30) return 1;
    return 0;
}

function locationSimilarityScore(sourceLocation = '', candidateLocation = '') {
    const sourceWords = new Set(sourceLocation.toLowerCase().split(/[\s,]+/).filter(Boolean));
    return candidateLocation
        .toLowerCase()
        .split(/[\s,]+/)
        .filter(Boolean)
        .some(word => sourceWords.has(word)) ? 2 : 0;
}

function recommendCampgrounds(sourceCampground, candidates, limit = 3) {
    return candidates
        .map(candidate => {
            const score =
                tagOverlapScore(sourceCampground.tags, candidate.tags) +
                priceSimilarityScore(sourceCampground.price, candidate.price) +
                locationSimilarityScore(sourceCampground.location, candidate.location) +
                Number(candidate.averageRating || 0) +
                (Number(candidate.sentimentScore || 0) * 10);

            return { campground: candidate, score: Number(score.toFixed(2)) };
        })
        .sort((left, right) => right.score - left.score)
        .slice(0, limit);
}

module.exports = { recommendCampgrounds };
