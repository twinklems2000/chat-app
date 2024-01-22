const {
  addMessage,
  getAllMessage,
} = require('../controllers/messageControllers');

const router = require('express').Router();

router.post('/addMessage', addMessage);

router.post('/getAllMessage', getAllMessage);

module.exports = router;
