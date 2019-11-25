const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const articleCtrl = require('../controllers/articles');

router.post('/', auth, articleCtrl.create);
router.post('/:articleId', auth, articleCtrl.update)

module.exports = router;