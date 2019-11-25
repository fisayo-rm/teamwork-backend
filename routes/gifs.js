const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const gifCtrl = require('../controllers/gifs');
const gifCommentCtrl = require('../controllers/gifComments');

router.post('/', auth, gifCtrl.create);
router.delete('/:gifId', auth, gifCtrl.delete);
router.post('/:gifId/comment', auth, gifCommentCtrl.create);

module.exports = router;