const positiveWords = new Set([
    'amazing', 'awesome', 'beautiful', 'best', 'calm', 'clean', 'comfortable',
    'excellent', 'friendly', 'good', 'great', 'happy', 'love', 'loved', 'nice',
    'peaceful', 'perfect', 'relaxing', 'safe', 'scenic', 'stunning', 'wonderful'
]);

const negativeWords = new Set([
    'awful', 'bad', 'boring', 'broken', 'crowded', 'dirty', 'disappointed',
    'expensive', 'hate', 'hated', 'horrible', 'loud', 'noisy', 'poor', 'rude',
    'sad', 'unsafe', 'waste', 'worst'
]);

function tokenize(text) {
    return String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);
}

function analyzeSentiment(text) {
    const words = tokenize(text);
    if (!words.length) {
        return { label: 'neutral', score: 0, confidence: 0 };
    }

    const score = words.reduce((total, word) => {
        if (positiveWords.has(word)) return total + 1;
        if (negativeWords.has(word)) return total - 1;
        return total;
    }, 0);

    const normalizedScore = Number((score / words.length).toFixed(3));
    const confidence = Number(Math.min(Math.abs(score) / 3, 1).toFixed(2));

    if (score > 0) return { label: 'positive', score: normalizedScore, confidence };
    if (score < 0) return { label: 'negative', score: normalizedScore, confidence };
    return { label: 'neutral', score: 0, confidence };
}

module.exports = { analyzeSentiment };
