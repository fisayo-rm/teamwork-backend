const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart()

const gifCtrl = require('../controllers/gifs');
const gifCommentCtrl = require('../controllers/gifComments');

const userAuth = auth.employee;

router.post('/', userAuth, multipartMiddleware, gifCtrl.create);
// router.post('/', multipartMiddleware, gifCtrl.create);
router.delete('/:gifId', userAuth, multipartMiddleware, gifCtrl.delete);
router.post('/:gifId/comment', userAuth, gifCommentCtrl.create);
router.get('/:gifId', userAuth, gifCtrl.getGif);

module.exports = router;
