const express = require('express');
const router = express.Router();
const automationService = require('../services/automation');

router.post('/prueba', automationService.handlePrueba);

module.exports = router;
