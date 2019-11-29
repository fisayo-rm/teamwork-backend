const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const feedCtrl = require('../controllers/feeds');

const userAuth = auth.employee;

router.get('/', userAuth, feedCtrl.getFeed);

module.exports = router;
