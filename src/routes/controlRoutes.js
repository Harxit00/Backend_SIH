const express = require('express');
const router = express.Router();
const controlController = require('../controllers/controlController');

router.get('/', controlController.getAllControls);
router.get('/:id', controlController.getControlById);
router.post('/', controlController.createControl);
router.put('/:id', controlController.updateControl);
router.delete('/:id', controlController.deleteControl);

module.exports = router;