const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const auth = require('../middleware/auth');

// Routes publiques ou protégées selon les besoins
router.get('/', catwayController.getAllCatways);
router.get('/:id', catwayController.getCatwayByNumber);

// Routes protégées par JWT
router.post('/', auth, catwayController.createCatway);
router.put('/:id', auth, catwayController.updateCatway);
router.delete('/:id', auth, catwayController.deleteCatway);

module.exports = router;