const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const articleCtrl = require('../controllers/articles');

router.post('/', auth, articleCtrl.create);

module.exports = router;