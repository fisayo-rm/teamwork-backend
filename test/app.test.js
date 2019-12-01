const chai = require('chai');
const chaiHttp = require('chai-http');
const uuidv4 = require('uuid/v4');
const app = require('../app');
const employeeCtrl = require('../controllers/employees');

let testToken = process.env.TEST_TOKEN;

// VERY IMPORTANT!!! Run "SET NODE_ENV=fistest" in local terminal before running this test

const { expect } = chai;
chai.use(chaiHttp);

describe('The Server', () => {
  it('Welcomes user to the api', (done) => {
    chai
      .request(app)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Welcome to TeamWork API v1');
        done();
      });
  });
});

describe('API Endpoints', () => {
  beforeEach(async () => {
    await employeeCtrl.deleteAll();
  });

  // before(() => {
  //   chai.request(app)
  //     .post('/api/v1/admin/signin')
  //     .send({
  //       email: 'johndoe@email.com',
  //       password: 'password',
  //     })
  //     .end((err, res) => {
  //     })
  // })

  it('Adds a new a employee', (done) => {
    chai.request(app)
      .post('/api/v1/auth/create-user')
      .send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'jdoe@email.com',
        password: 'password',
        gender: 'male',
        job_role: 'Engineer',
        department: 'IT',
        address: 'here, there, everywhere',
      })
      .set('x-access-token', testToken)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('User account created successfully');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('userId');
        done();
      });
  });

  it('Logs employees in', (done) => {
    chai.request(app)
      .post('/api/v1/auth/create-user')
      .send({
        first_name: 'John',
        last_name: 'Doey',
        email: 'jdoe@email.com',
        password: 'password',
        gender: 'male',
        job_role: 'Engineer',
        department: 'IT',
        address: 'here, there, everywhere',
      })
      .set('x-access-token', testToken)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('User account created successfully');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('userId');
        done();
      });

    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'jdoe@email.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('userId');
        done();
      });
  });

  // it('Employees can create and share gifs with other colleagues', (done) => {
  //   chai.request(app)
  //     .post('/api/v1/auth/create-user')
  //     .send({
  //       first_name: "John",
  //       last_name: "Doe",
  //       email: 'jdoe@email.com',
  //       password: 'password',
  //       gender: 'male',
  //       job_role: 'Engineer',
  //       department: 'IT',
  //       address: 'here, there, everywhere'
  //      })
  //     .end((err, res) => {
  //       expect(res).to.have.status(201);
  //       expect(res.body.status).to.equal('success');
  //       expect(res.body.data.message).to.equal('User account created successfully');
  //       expect(res.body.data).to.have.property('token');
  //       expect(res.body.data).to.have.property('userId');
  //       done();
  //     });
  // })
});
