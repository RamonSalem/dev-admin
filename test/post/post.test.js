//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

const Post = require('../../src/post/post.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Test post', () => {
    beforeEach((done) => { //Before each test we empty the database
         Post.remove({}, (err) => {
           done();
         });
    });
/*
  * Test the /GET route
  */
  describe('/GET test post', () => {
      it('it should GET test post', (done) => {
        chai.request(app)
            .get('/posts/testing')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
              done();
            });
      });
  });

});
