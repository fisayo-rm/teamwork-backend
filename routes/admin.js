const express = require('express');

const router = express.Router();

const adminCtrl = require('../controllers/admin');

router.post('/create-admin', adminCtrl.create);
router.post('/signin', adminCtrl.login);

module.exports = router;
