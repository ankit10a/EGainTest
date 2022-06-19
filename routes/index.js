const express = require('express');
const router = express.Router();
const exceptionsController = require('../controller/index');

router.get('/exceptions',exceptionsController)



module.exports = router;