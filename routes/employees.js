const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
      status: 'success',
      message: 'Welcome to TeamWork API v1',
    });
  })

module.exports = router;