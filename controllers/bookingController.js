const catchAsync = require('../helpers/catchAsync');
const Tour = require('../models/tourModel');
const dotenv = require('dotenv');
const Booking = require('../models/bookingModel');
dotenv.config({ path: './config.env' });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KET);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}?tour=${req.params.tourId}&&price=${tour.price}&&user=${req.user.id}`,
    cancel_url: `${req.protocol}://${req.get('host')}/overview`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          },
          unit_amount: tour.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  console.log(1, session);
  // 3) Send session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBooking = async (req, res, next) => {
  const { user, tour, price } = req.query;
  if (!user || !tour || !price) return next();

  const book = await Booking.create({ user, tour, price });
  console.log(book);

  res.redirect(req.originalUrl.split('?')[0]);
};
