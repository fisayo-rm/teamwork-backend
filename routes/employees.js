const express = require("express");
const router = express.Router();

const employeeCtrl = require("../controllers/employees");



router.post("/create-user", employeeCtrl.create);
router.post('/signin', employeeCtrl.login);


module.exports = router;
