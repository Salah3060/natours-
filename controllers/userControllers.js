const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/userModel');
const catchAsync = require('../helpers/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../helpers/AppError');

// ############## without any image proccessing

// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/img/users');
//   },
//   filename: function (req, file, cb) {
//     const exe = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${exe}`);
//   },
// });

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else
    cb(
      new AppError(`it's not an image , Please upload image only.....`, 400),
      false,
    );
};

//############### PROVIDED THAT +++> can be done using sharp package to proccessing photo

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter,
});

exports.getUserPhoto = upload.single('photo'); // to upload single file

// case many file
// upload.array([] , maxCount) or upload.fields({name:'fieldName' , maxCount: })

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});
exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);
