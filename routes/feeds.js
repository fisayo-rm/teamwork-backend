const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const feedCtrl = require('../controllers/feeds');

router.get('/', auth, feedCtrl.getFeed);

module.exports = router;
