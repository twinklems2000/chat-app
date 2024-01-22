const router = require('express').Router();
const {
  register,
  login,
  setAvatar,
  getAllUser,
} = require('../controllers/userControllers');
const { registerValidators } = require('../utils/validators');
const { loginValidators } = require('../utils/validators');

router.post('/register', registerValidators, register);

router.post('/login', loginValidators, login);

router.post('/setAvatar/:id', setAvatar);

router.get('/getAllUser/:id', getAllUser);

module.exports = router;
