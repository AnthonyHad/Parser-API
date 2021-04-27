# molecular-parser

This is a simple API that takes a string representing a molecule as input, counts the number of atoms of each element contained in the molecule, and returns an object where keys correspond to atoms and values to the number of each atom in the molecule.

For example:

The input 'H2O' returns {'H': 2, 'O': 1}
The input 'K4[ON(SO3)2]2' returns {'K': 4, 'O': 14, 'N': 2, 'S': 4}

The API also take into consideration different types of brackets: "( )", "[ ]", "{ }" 

Installation Guide

To be able to use this code locally on your machine please follow these steps:
1) Clone this repository to your machine
2) In your terminal, run the following script -> "npm run concur" so that both BackEnd and FrontEnd run concurrently
3) If you would like to run some tests on the App just run "npm test" in your terminal 

Tech-Stack

Technologies used to build this API are Node.js for the BackEnd, React JS for the FrontEnd and Heroku for deployment

NPM Packages Used

BackEnd:
1) Express JS
2) Concurrently
3) Express Validator
4) Dotenv
5) Nodemon
6) Mocha
7) Chai 
8) Chai-http

FrontEnd:
1) Framer 
2) Framer motion 
3) React Sky
