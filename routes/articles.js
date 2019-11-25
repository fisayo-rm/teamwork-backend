const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const articleCtrl = require('../controllers/articles');

router.post('/', auth, articleCtrl.create);
router.put('/:articleId', auth, articleCtrl.update)
router.delete('/:articleId', auth, articleCtrl.delete);

module.exports = router;