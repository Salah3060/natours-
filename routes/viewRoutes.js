const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/overview',
  bookingController.createBooking,
  authController.isLoggedIn,
  viewController.getOverview,
);
router.get(
  '/',
  bookingController.createBooking,
  authController.isLoggedIn,
  viewController.getOverview,
);
router.get(
  '/tour/:tourSlug',
  authController.isLoggedIn,
  viewController.getTour,
);

router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getMe);
router.get('/mybooking', authController.protect, viewController.getMyBooking);
module.exports = router;
