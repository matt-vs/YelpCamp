const express = require('express');
const router = express.Router({ mergeParams: true });
const ExpressError = require('../utils/expressError');
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review');
const { campgroundSchema, reviewSchema } = require('../schemas.js');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews')


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.newReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;