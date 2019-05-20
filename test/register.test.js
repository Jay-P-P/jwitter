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

describe('/api/users/register', function() {
  describe('RegisterValidator', function() {
    describe('Email', function() {
      it('should return error when email field is not given', function(done) {
        chai
          .request(server)
          .post('/api/users/register')
          .send({
            name: 'jay1',
            password: '!Password2',
            passwordConfirm: '!Password2'
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
          .post('/api/users/register')
          .send({
            email: 'InvalidEmailFormat',
            name: 'jay1',
            password: '!Password2',
            passwordConfirm: '!Password2'
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

      it('should return error if an account already exists that uses the email', function(done) {
        chai
          .request(server)
          .post('/api/users/register')
          .send({
            email: 'test@gmail.com',
            name: 'jay1',
            password: '!Password2',
            passwordConfirm: '!Password2'
          })
          .then(function(res) {
            expect(res).to.have.status('400');
            expect(res)
              .to.haveOwnProperty('body')
              .that.has.property('errors')
              .that.has.property('email')
              .with.string('Email already exists.');
            done();
          })
          .catch(function(err) {
            console.log(err);
          });
      });
    });

    describe('Name', function() {
      it('should return error when name field is not given', function(done) {
        chai
          .request(server)
          .post('/api/users/register')
          .send({
            email: 'test2@gmail.com',
            password: '!Password2',
            passwordConfirm: '!Password2'
          })
          .then(function(res) {
            expect(res).to.have.status('400');
            expect(res)
              .to.haveOwnProperty('body')
              .that.has.property('errors')
              .that.has.property('name')
              .with.string('Name is required.');
            done();
          })
          .catch(function(err) {
            console.log(err);
            done();
          });
      });

      it('should return error when name field length is less than 1 or greater than 16', function(done) {
        chai
          .request(server)
          .post('/api/users/register')
          .send({
            email: 'test2@gmail.com',
            name: '',
            password: '!Password2',
            passwordConfirm: '!Password2'
          })
          .then(function(res) {
            expect(res).to.have.status('400');
            expect(res)
              .to.haveOwnProperty('body')
              .that.has.property('errors')
              .that.has.property('name')
              .with.string(
                'Name length must be between 1 and 16 characters long.'
              );
            done();
          })
          .catch(function(err) {
            console.log(err);
            done();
          });
      });

      it('should return error when name field is not alphanumeric', function(done) {
        chai
          .request(server)
          .post('/api/users/register')
          .send({
            email: 'test2@gmail.com',
            name: 'ja@2323',
            password: '!Password2',
            passwordConfirm: '!Password2'
          })
          .then(function(res) {
            expect(res).to.have.status('400');
            expect(res)
              .to.haveOwnProperty('body')
              .that.has.property('errors')
              .that.has.property('name')
              .with.string('Name can only contain letters and numbers.');
            done();
          })
          .catch(function(err) {
            console.log(err);
            done();
          });
      });

      it('should return error when name is already being used by another user', function(done) {
        chai
          .request(server)
          .post('/api/users/register')
          .send({
            email: 'test2@gmail.com',
            name: 'jay',
            password: '!Password2',
            passwordConfirm: '!Password2'
          })
          .then(function(res) {
            expect(res).to.have.status('400');
            expect(res)
              .to.haveOwnProperty('body')
              .that.has.property('errors')
              .that.has.property('name')
              .with.string('Name already in use.');
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
          .post('/api/users/register')
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

      it('should return error when password does not meet strong requirements', function(done) {
        chai
          .request(server)
          .post('/api/users/register')
          .send({
            password: 'weakpassword'
          })
          .then(function(res) {
            expect(res).to.have.status('400');
            expect(res)
              .to.haveOwnProperty('body')
              .that.has.property('errors')
              .that.has.property('password')
              .with.string(
                'Password does not meet strong password requirements.'
              );
            done();
          })
          .catch(function(err) {
            console.log(err);
            done();
          });
      });
    });

    describe('PasswordConfirm', function() {
      it('should return error when password field is not given', function(done) {
        chai
          .request(server)
          .post('/api/users/register')
          .send({
            email: 'test@gmail.com'
          })
          .then(function(res) {
            expect(res).to.have.status('400');
            expect(res)
              .to.haveOwnProperty('body')
              .that.has.property('errors')
              .that.has.property('passwordConfirm')
              .with.string('Password confirmation is required.');
            done();
          })
          .catch(function(err) {
            console.log(err);
            done();
          });
      });

      it('should return error when password does not match passwordConfirm field', function(done) {
        chai
          .request(server)
          .post('/api/users/register')
          .send({
            email: 'test@gmail.com',
            password: '!Password2',
            passwordConfirm: 'UnmatchedPassword2!'
          })
          .then(function(res) {
            expect(res).to.have.status('400');
            expect(res)
              .to.haveOwnProperty('body')
              .that.has.property('errors')
              .that.has.property('passwordConfirm')
              .with.string('Passwords do not match.');
            done();
          })
          .catch(function(err) {
            console.log(err);
            done();
          });
      });
    });
  });
});
