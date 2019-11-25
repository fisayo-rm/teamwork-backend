const express = require("express");
const router = express.Router();

const employeeCtrl = require("../controllers/employees");

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to TeamWork API v1"
  });
});

router.post("/auth/create-user", employeeCtrl.create);
router.post('/auth/signin', employeeCtrl.login);

module.exports = router;
