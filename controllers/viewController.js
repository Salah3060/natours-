const Tour = require('../models/tourModel');
const catchAsync = require('../helpers/catchAsync');
const AppError = require('../helpers/AppError');
const Booking = require('../models/bookingModel');
exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});
exports.getTour = async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.tourSlug }).populate(
    'reviews',
  );
  if (!tour) {
    return next(new AppError('there is no tour with this name', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
};

exports.getLoginForm = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login in',
  });
};

exports.getMe = async (req, res, next) => {
  try {
    res.status(200).render('account', {
      title: req.user.name,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyBooking = catchAsync(async (req, res, next) => {
  const book = await Booking.find({ user: req.user.id });

  const tourIds = book.map((el) => el.tour);

  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    tours,
    title: 'My Booking Tours',
  });
});
