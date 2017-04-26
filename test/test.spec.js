//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Test', () => {
    beforeEach((done) => { //Before each test we empty the database
        // COLLECTION.remove({}, (err) => {
           done();
        // });
    });
/*
  * Test the /GET route
  */
  describe('/GET test', () => {
      it('it should GET test', (done) => {
        chai.request(app)
            .get('/tasks/test')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
              done();
            });
      });
  });

});
