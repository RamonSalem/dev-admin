//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

const Post = require('../src/post/post.model');

const postDba = require('../src/post/post.dba');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Posts', () => {
    beforeEach((done) => { //Before each test we empty the database
         Post.remove({}, (err) => {
           done();
         });
    });
/*
  * Test the /post route of entity posts
*/
  describe('/POST posts', () => {
      it('it should POST a postage', (done) => {
        const newPost = {
            title : "Pagamento sistema 1 ",
            description : "pagamento sistema 1 recebido com sucesso",
            postedBy : "employeeID",
            type : "global",
            tags : ["Node","Angular"] 
        }
        
        chai.request(app)
            .post('/posts')
            .send(newPost)
            .end((err, res) => {
                //console.log(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('postDate');
                res.body.should.have.property('postedBy');
              done();
            });
      });
      
      it('it should NOT POST a postage without a title', (done) => {
        const newPost = {
            description : "pagamento sistema 1 recebido com sucesso",
            postedBy : "employeeID",
            type : "global",
            tags : ["Node","Angular"] 
        }
        
        chai.request(app)
            .post('/posts')
            .send(newPost)
            .end((err, res) => {
                //console.log(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.should.have.property('name', 'ValidationError');
              done();
            });
      });

      it('it should NOT POST a postage without a description', (done) => {
        const newPost = {
            title : "Pagamento sistema 1 ",
            postedBy : "employeeID",
            type : "global",
            tags : ["Node","Angular"] 
        }
        
        chai.request(app)
            .post('/posts')
            .send(newPost)
            .end((err, res) => {
                //console.log(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.should.have.property('name', 'ValidationError');
              done();
            });
      });

      it('it should NOT POST a postage without postedBy', (done) => {
        const newPost = {
            title : "Pagamento sistema 1 ",
            description : "pagamento sistema 1 recebido com sucesso",
            type : "global",
            tags : ["Node","Angular"] 
        }
        
        chai.request(app)
            .post('/posts')
            .send(newPost)
            .end((err, res) => {
                //console.log(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.should.have.property('name', 'ValidationError');
              done();
            });
      });

  });

  describe('/GET posts', ()=>{
      it('it should GET all postages', done=>{
          chai.request(app)
          .get('/posts')
          .end((err, res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('result');
              res.body.should.have.property('code');
              res.body.result.should.be.a('array', 'Array of all posts');
              res.body.code.should.be.a('number');
              res.body.result.length.should.be.eql(0, 'The collection still empty, but working');
              done();
          });
      });

  });



//try with async await
  describe('/GET/:id posts', ()=>{
      it('it should GET a postage with given id', (done)=>{
          const postInfo = {
            title : "Pagamento sistema 1 ",
            description : "pagamento sistema 1 recebido com sucesso",
            postedBy : "employeeID",
            type : "global",
            tags : ["Node","Angular"] 
        } 
        const newPost = new Post(postInfo);

        newPost.save().then(post=>{
            chai.request(app)
            .get('/posts/' + post.id)
            .send(post)
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('result');
                res.body.should.have.property('code');
                res.body.result.should.be.a('object');
                res.body.code.should.be.a('number');
                res.body.result.should.have.property('title');
                res.body.result.should.have.property('description');
                res.body.result.should.have.property('postedBy');
                res.body.result.should.have.property('_id').eql(post.id); 
                done();
            });
        }).catch(err=>{
            console.log(err);
            chai.request(app).end((err, res)=>{
                done();

            });
        })
            

      });

  });  


  describe('/PUT/:id posts', ()=>{
      it('it should PUT (update) a postage with given id', (done)=>{
         const newPostTest = {
            title : "Pagamento sistema ",
            description : "pagamento sistema 1 recebido com sucesso",
            postedBy : "employeeID",
            type : "global",
            tags : ["Node","Angular"] 
        } 
            newPostTest.postDate = new Date();
            const newPost = new Post(newPostTest);
            newPost.save((err, post)=>{
                const updatePostInfo = {
                    _id : post._id,
                    title : "Pagamento sistema edited ",
                    description : "pagamento sistema edited",
                    postedBy : "employeeID edited",
                    type : "global",
                    tags : ["Node","Angular", "edited"] ,
                }
                
                chai.request(app)
                .put('/posts/' + updatePostInfo._id)
                .send(updatePostInfo)
                .end((err, res)=>{
                
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result');
                    res.body.should.have.property('code');
                    res.body.result.should.be.a('object');
                    res.body.code.should.be.a('number');
                    res.body.result.should.have.property('title');
                    res.body.result.should.have.property('description');
                    res.body.result.should.have.property('postedBy');
                    res.body.result.should.have.property('postDate');

                    res.body.result.should.have.property('_id').eql(post.id); 
                    done();
            });
            
        });
      
      });

      it('it should NOT PUT (update0) a postage when missing information', (done)=>{
         const newPostTest = {
            title : "Pagamento sistema ",
            description : "pagamento sistema 1 recebido com sucesso",
            postedBy : "employeeID",
            type : "global",
            tags : ["Node","Angular"] 
        } 
            newPostTest.postDate = new Date();
            const newPost = new Post(newPostTest);
            newPost.save((err, post)=>{
                const updatePostInfo = {
                    _id : post._id,
                    description : "pagamento sistema edited",
                    type : "global",
                    tags : ["Node","Angular", "edited"] ,
                }
                
                chai.request(app)
                .put('/posts/' + updatePostInfo._id)
                .send(updatePostInfo)
                .end((err, res)=>{
                
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result');
                    res.body.should.have.property('code');
                    res.body.should.have.property('message');
                    res.body.result.should.be.a('object');
                    res.body.code.should.be.a('number');
 
                    done();
            });
            
        });
      
      });

  });


describe('/DELETE/:id posts', ()=>{
      it('it should DELETE a postage with given id', (done)=>{
         const newPostTest = {
            title : "Pagamento sistema ",
            description : "pagamento sistema 1 recebido com sucesso",
            postedBy : "employeeID",
            type : "global",
            tags : ["Node","Angular"] 
        } 
            newPostTest.postDate = new Date();
            const newPost = new Post(newPostTest);
            newPost.save((err, post)=>{
                const updatePostInfo = {
                    _id : post._id,
                    title : "Pagamento sistema edited ",
                    description : "pagamento sistema edited",
                    postedBy : "employeeID edited",
                    type : "global",
                    tags : ["Node","Angular", "edited"] ,
                }
                
                chai.request(app)
                .delete('/posts/' + updatePostInfo._id)
                .end((err, res)=>{
                
                    res.should.have.status(200);
                    res.body.should.have.property('result').eql('Removed');
                    res.body.should.be.a('object');
                    res.body.should.have.property('result');
                    res.body.should.have.property('code');
                    res.body.result.should.be.a('string');
                    res.body.code.should.be.a('number');
                    done();
            });
            
        });
      
      });

  });


});
