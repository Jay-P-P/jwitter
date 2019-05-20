const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
chai.use(chaiHttp);

let server;
before(async function() {
  server = require('../server');
});
after(function(done) {
  server.close();
  done();
});

describe('/api/users/login', function() {
  describe('LoginValidator', function() {
    describe('Email', function() {
      it('should return error when email field is not given', function(done) {
        chai
          .request(server)
          .post('/api/users/login')
          .send({
            password: '!Password2'
          })
          .then(function(res) {
            expect(res).to.have.status('400');
            expect(res)
              .to.haveOwnProperty('body')
              .that.has.property('errors')
              .that.has.property('email')
              .with.string('Email is required.');
            done();
          })
          .catch(function(err) {
            console.log(err);
            done();
          });
      });

      it('should return error when email format is invalid', function(done) {
        chai
          .request(server)
          .post('/api/users/login')
          .send({
            email: 'InvalidEmailFormat',
            password: '!Password2'
          })
          .then(function(res) {
            expect(res).to.have.status('400');
            expect(res)
              .to.haveOwnProperty('body')
              .that.has.property('errors')
              .that.has.property('email')
              .with.string('Email is not valid.');
            done();
          })
          .catch(function(err) {
            console.log(err);
          });
      });

      it("should return error when an account doesn't exist for the given email", function(done) {
        chai
          .request(server)
          .post('/api/users/login')
          .send({
            email: 'test2@gmail.com',
            password: '!Password2'
          })
          .then(function(res) {
            expect(res).to.have.status('400');
            expect(res)
              .to.haveOwnProperty('body')
              .that.has.property('errors')
              .that.has.property('email')
              .with.string('Account does not exist.');
            done();
          })
          .catch(function(err) {
            console.log(err);
            done();
          });
      });
    });
    describe('Password', function() {
      it('should return error when password field is not given', function(done) {
        chai
          .request(server)
          .post('/api/users/login')
          .send({
            email: 'test@gmail.com'
          })
          .then(function(res) {
            expect(res).to.have.status('400');
            expect(res)
              .to.haveOwnProperty('body')
              .that.has.property('errors')
              .that.has.property('password')
              .with.string('Password is required.');
            done();
          })
          .catch(function(err) {
            console.log(err);
            done();
          });
      });
    });
  });
  describe('Incorrect Password', function() {
    it('should return login error when password is incorrect', function(done) {
      chai
        .request(server)
        .post('/api/users/login')
        .send({
          email: 'test@gmail.com',
          password: '!IncorrectPassword2'
        })
        .then(function(res) {
          expect(res).to.have.status('400');
          assert.deepStrictEqual(res.body['errors'], {
            login: 'Account details are incorrect.'
          });
          done();
        })
        .catch(function(err) {
          console.log(err);
          done();
        });
    });
  });
  describe('Valid login', function() {
    it('should login and return jwt token', function(done) {
      chai
        .request(server)
        .post('/api/users/login')
        .send({
          email: 'test@gmail.com',
          password: '!Password2'
        })
        .then(function(res) {
          expect(res).to.have.status('200');
          expect(res)
            .to.haveOwnProperty('body')
            .which.has.property('token');
          done();
        })
        .catch(function(err) {
          console.log(err);
          done();
        });
    });
  });
});
