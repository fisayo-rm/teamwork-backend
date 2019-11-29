const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const gifCtrl = require('../controllers/gifs');
const gifCommentCtrl = require('../controllers/gifComments');

const userAuth = auth.employee;

router.post('/', userAuth, gifCtrl.create);
router.delete('/:gifId', userAuth, gifCtrl.delete);
router.post('/:gifId/comment', userAuth, gifCommentCtrl.create);
router.get('/:gifId', userAuth, gifCtrl.getGif);

module.exports = router;
