const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'Booking must belong to user'],
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    require: [true, 'Booking must belong to Tour'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
    require: [true, 'Booking must have a price '],
  },
  paid: {
    type: Boolean,
    defalut: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({ path: 'tour', select: 'name' }).populate({
    path: 'user',
    select: 'name',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
