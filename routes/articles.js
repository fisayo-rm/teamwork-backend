const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const articleCtrl = require('../controllers/articles');
const articleCommentCtrl = require('../controllers/articleComments');

router.post('/', auth, articleCtrl.create);
router.put('/:articleId', auth, articleCtrl.update)
router.post('/:articleId/comment', auth, articleCommentCtrl.create);
router.delete('/:articleId', auth, articleCtrl.delete);

module.exports = router;