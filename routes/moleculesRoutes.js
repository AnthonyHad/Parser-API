const express = require('express');
const { check } = require('express-validator')

const moleculesController = require('../controllers/moleculesController');

// Express router
const router = express.Router();

// Routing to respective controller function with a first
// validation to check if request body is empty
router.post('/parse', check('molecule').notEmpty(), moleculesController.postMolecules);

module.exports = router;
