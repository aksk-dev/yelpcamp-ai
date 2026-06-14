# YelpCamp

YelpCamp is a campground discovery and review web app built with Express, EJS, MongoDB, and Mongoose.

## Features

- Campground CRUD: create, list, view, edit, and delete campgrounds.
- Review system with ratings.
- Local NLP sentiment analysis for review text.
- Recommendation engine based on tags, location, price, ratings, and sentiment.
- Geospatial campground search using MongoDB `2dsphere` indexes.
- Search filters for keywords, price range, latitude, longitude, and radius.
- Server-side validation with Joi.
- Flash messages for user feedback.
- MongoDB relationships between campgrounds and reviews.
- EJS layouts and reusable partials.

## Tech Stack

- Node.js
- Express
- EJS and EJS Mate
- MongoDB
- Mongoose
- Joi
- Bootstrap-style server-rendered views

## AI/ML and Search Features

This project includes explainable AI-style features that are easy to discuss in interviews:

- Review sentiment analysis uses a local NLP lexicon to classify reviews as positive, neutral, or negative.
- Campground sentiment summaries are recalculated after review create/delete operations.
- Recommendations score similar campgrounds using tag overlap, price similarity, location similarity, average rating, and sentiment score.
- Geospatial search uses stored longitude/latitude coordinates and MongoDB's `2dsphere` index.

## Local Setup

```bash
npm install
copy .env.example .env
npm run seed
npm start
```

The app runs on `http://localhost:3000` by default.

## Deployment

The repo includes a root-level `render.yaml` for Render deployment. Add these environment variables in Render:

- `DB_URL`
- `SESSION_SECRET`
- `NODE_ENV=production`

See `DEPLOYMENT.md` for details.

## Project Structure

```text
yelpcamp/
  app.js
  models/
  routes/
  views/
  public/
  seeds/
  utils/
  schemas.js
```

## Resume Positioning

Use this as a full-stack project:

> Built a campground discovery and review platform using Node.js, Express, MongoDB, Mongoose, and EJS with CRUD workflows, schema validation, relational data modeling, flash messaging, and server-rendered UI.

Current stronger resume version:

> Developed an AI-enhanced campground discovery platform using Node.js, Express, MongoDB, and EJS with CRUD workflows, user reviews, personalized recommendations, sentiment analysis, and geospatial search.

After deployment, update it to:

> Developed and deployed an AI-enhanced campground discovery platform using Node.js, Express, MongoDB, and EJS with CRUD workflows, user reviews, personalized recommendations, sentiment analysis, and geospatial search.
