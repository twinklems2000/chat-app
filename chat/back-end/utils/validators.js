const { body } = require('express-validator');

(registerValidators = [
  body('name')
    .trim()
    .isLength(3)
    .withMessage('Name length must be greater than 2'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email must be a valid email')
    .normalizeEmail()
    .toLowerCase(),
  body('password')
    .trim()
    .isLength(4)
    .withMessage('Name length must be greater than 3'),
]),
  (loginValidators = [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Email must be a valid email')
      .normalizeEmail()
      .toLowerCase(),
    body('password')
      .trim()
      .isLength(4)
      .withMessage('Name length must be greater than 3'),
  ]);

module.exports = { registerValidators, loginValidators };
