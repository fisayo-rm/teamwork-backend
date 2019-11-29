const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const articleCtrl = require('../controllers/articles');
const articleCommentCtrl = require('../controllers/articleComments');

const userAuth = auth.employee;

router.post('/', userAuth, articleCtrl.create);
router.put('/:articleId', userAuth, articleCtrl.update);
router.post('/:articleId/comment', userAuth, articleCommentCtrl.create);
router.delete('/:articleId', userAuth, articleCtrl.delete);
router.get('/:articleId', userAuth, articleCtrl.getArticle);

module.exports = router;
