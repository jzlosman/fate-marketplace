    process.env.NODE_ENV = 'test';
    
    var mongoose = require("mongoose");
    var Character = require("../components/characters/characters.model");
    
    var chai = require('chai');
    var chaiHttp = require('chai-http');
    var server = require('../server');
    var config = require('config');
    
    var should = chai.should();
    
    var auth_token = '';
    
    // set up chai
    chai.use(chaiHttp);
    
    describe('Characters', function() {
        beforeEach(function(done) {
            /* REMOVE ALL CHARACTERS at the start of the test
            Character.remove({}, function(err) {
                done();
            })*/
        });
    });
    
    describe('/GET characters', function() {
        it('it should GET all characters', function(done) {
            chai.request(server)
                .get('/api/characters')
                .end( function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_meta');
                    res.body.should.have.property('_embedded');
                    res.body._embedded.should.be.a('array');
                    done();
                });
        });
    });
    
    describe('/POST characters', function() {
        it('it should not POST a character without a name', function(done) {
            var character = {
                description: "A sample character that will never actually make it to the database.",
                aspects: {
                    high_concept: "harmless as a lamb",
                    trouble: "a failed character, from the start"
                }
            }
            getAuthToken(function(token) {
                chai.request(server)
                    .post('/api/characters')
                    .set('Authorization', 'bearer '+token)
                    .send(character)
                    .end(function(err, res) {
                        res.should.have.status(409);
                        res.body.should.be.a('object');
                        res.body.data.should.have.property('name');
                        done();
                    })
            });
            
        });
        
        it('it should POST a character with all required fields set', function(done) {
            var character = {
                name: "New Character From Tests",
                description: "A sample character that will actually make it to the database.",
                aspects: {
                    high_concept: "harmless as a lamb",
                    trouble: "a troubled character, from the start"
                }
            }
            getAuthToken(function(token) {
                chai.request(server)
                    .post('/api/characters')
                    .set('Authorization', 'bearer '+token)
                    .send(character)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.data.name.should.equal(character.name);
                        done();
                    })
            });
            
        })
    });
    var getAuthToken = function(next){
        if(auth_token != ''){
            return next(auth_token);
        }
        
        chai.request(server)
            .post('/api/users/login')
            .send(config.login)
            .end( function(err, res) {
                auth_token = res.body.token.value;
                next(auth_token);
            });
    };