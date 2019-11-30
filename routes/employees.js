const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const employeeCtrl = require('../controllers/employees');

const adminAuth = auth.admin;


router.post('/create-user', adminAuth, employeeCtrl.create);
router.post('/signin', employeeCtrl.login);


module.exports = router;
