const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { recommendCampgrounds } = require('../services/recommendations');

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

function normalizeCampgroundData(body) {
    const data = { ...body.campground };
    const latitude = Number(data.latitude);
    const longitude = Number(data.longitude);

    data.tags = String(data.tags || '')
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);

    delete data.latitude;
    delete data.longitude;

    if (!Number.isNaN(latitude) && !Number.isNaN(longitude)) {
        data.geometry = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
    }

    return data;
}

router.get('/', catchAsync(async (req, res) => {
    const { q, minPrice, maxPrice, lat, lng, distance } = req.query;
    const filters = {};

    if (q) {
        const searchRegex = new RegExp(q, 'i');
        filters.$or = [
            { title: searchRegex },
            { location: searchRegex },
            { description: searchRegex },
            { tags: searchRegex }
        ];
    }

    if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = Number(minPrice);
        if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    if (lat && lng) {
        filters.geometry = {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [Number(lng), Number(lat)]
                },
                $maxDistance: Number(distance || 50) * 1000
            }
        };
    }

    const campgroundQuery = Campground.find(filters);
    if (!(lat && lng)) {
        campgroundQuery.sort({ averageRating: -1, sentimentScore: -1 });
    }

    const campgrounds = await campgroundQuery;
    res.render('campgrounds/index', { campgrounds, filters: req.query })
}));

router.get('/new', (req, res) => {
    res.render('campgrounds/new');
})


router.post('/', validateCampground, catchAsync(async (req, res, next) => {
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(normalizeCampgroundData(req.body));
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', catchAsync(async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    const candidates = await Campground.find({ _id: { $ne: campground._id } }).limit(50);
    const recommendations = recommendCampgrounds(campground, candidates);
    res.render('campgrounds/show', { campground, recommendations });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}))

router.put('/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, normalizeCampgroundData(req.body));
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}));

module.exports = router;
