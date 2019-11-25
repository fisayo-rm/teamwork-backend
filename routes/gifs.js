const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const gifCtrl = require('../controllers/gifs');

router.post('/', auth, gifCtrl.create);

module.exports = router;