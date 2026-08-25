const express = require('express');
const router = express.Router();
const riskController = require('../controllers/riskController');

router.post('/calculate', riskController.calculateRisk);
router.get('/', riskController.getAllRisks);
router.get('/dashboard', riskController.getDashboard);
router.get('/:id', riskController.getRiskById);
router.delete('/:id', riskController.deleteRisk);

module.exports = router;