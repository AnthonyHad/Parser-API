
// Initializing validation result function
const { validationResult } = require('express-validator');

// Importing the moleculeParser function
const moleculeParser = require('../moleculeParser')


// Handling POST request sent from React
exports.postMolecules = (req, res, next ) => {
  // Handling empty post requests sent from React using express validator
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).send({
      molecule: "Can't parse a blank molecule :)",
      message: ""
    })
  } else {
    let molecule = req.body.molecule;
    let result = moleculeParser(molecule);

    res.status(201).json({
      molecule: result
    });
  }
}
