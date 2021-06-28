const express = require("express");
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singleMulterUpload, singlePublicFileUpload,  multipleMulterUpload,  multiplePublicFileUpload, } = require("../../awsS3");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const db  = require('../../db/models');
const { Image, User, Comment, Album } = db;

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

const router = express.Router();

router.post(
  "/",
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const profileImageUrl = await singlePublicFileUpload(req.file);
    const user = await User.signup({ username, email, password, profileImageUrl, });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

router.get('/demo', asyncHandler(async (req, res) => {
  // if (req.session.auth) {
  //    }
  let random = Math.floor(Math.random() * 5000)
  const user = db.User.build({
    username: `DemoUser${random}`,
    email: `demo${random}@demoUser.com`,
    hashedPassword: "Password123!"
  })

  if (user) {
    await user.save();
    loginUser(req, res, user)
    // res.redirect('/home')
  }

}))

module.exports = router;
