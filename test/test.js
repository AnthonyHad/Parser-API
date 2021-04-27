let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');


//Assertion Style
chai.should()

chai.use(chaiHttp)


// Tests

describe('Molecule Parser Api', () => {
  it("should tell the user that a blank molecule can't be parsed", (done) => {
    const molecule = {
      molecule: ""
    }
    chai.request(app)
        .post("/molecule/parse")
        .send(molecule)
        .end((err, response) => {
          response.should.have.status(400)
          response.body.should.be.an('object')
          response.body.should.deep.equal({
            molecule: "Can't parse a blank molecule :)",
            message: ""
          })
        done();
        });
    });

  it("should properly parse a molecule such as H2O", (done) => {
    const molecule = {
      molecule: "H2O"
    }
    chai.request(app)
        .post("/molecule/parse")
        .send(molecule)
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.an('object')
          response.body.should.deep.equal({
            molecule: {
              'H': 2,
              'O': 1
           }
         })
        done();
        });
    });

  it("should properly parse a complex molecule such as K4[ON(SO3)2]2", (done) => {
    const molecule = {
      molecule: "K4[ON(SO3)2]2"
    }
    chai.request(app)
        .post("/molecule/parse")
        .send(molecule)
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.an('object')
          response.body.should.deep.equal({
            molecule: {
              'K': 4,
              'O': 14,
              'N': 2,
              'S': 4
           }
         })
        done();
        });
    });

  it("should not parse a molecule that starts with a special character", (done) => {
    const molecule = {
      molecule: "{"
    }
    chai.request(app)
        .post("/molecule/parse")
        .send(molecule)
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.an('object')
          response.body.should.deep.equal({
            molecule: "molecule cannot just start with a special character"
          })
        done();
        });
    });

  it("should not parse a molecule that has non-uniform delimeters", (done) => {
    const molecule = {
      molecule: "O2{SO3]"
    }
    chai.request(app)
        .post("/molecule/parse")
        .send(molecule)
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.an('object')
          response.body.should.deep.equal({
            molecule: "molecule delimiters should be of the same type ex: (SO3) not (SO3]"
          })
        done();
        });
    });

  it("should not parse a molecule that is not an actual chemical element", (done) => {
    const molecule = {
      molecule: "StO2"
    }
    chai.request(app)
        .post("/molecule/parse")
        .send(molecule)
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.an('object')
          response.body.should.deep.equal({
            molecule: "your molecule is not discovered yet! please enter a molecule from this planet"
          })
        done();
        });
    });

  it("should not parse a molecule that is only {} [] or ()", (done) => {
    const molecule = {
      molecule: "{}"
    }
    chai.request(app)
        .post("/molecule/parse")
        .send(molecule)
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.an('object')
          response.body.should.deep.equal({
            molecule: "your molecule cannot be void!"
          })
        done();
        });
    });
});
