const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

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
  it('Adds a new a employee', (done) => {
    const userId = 454
    chai.request(app)
      .post('/api/v1/auth/create-user')
      .send({ 
        first_name: "John",
        last_name: "Doe",
        email: 'johndoe@email.com',
        password: 'password',
        gender: 'male',
        job_role: 'Engineer',
        department: 'IT',
        address: 'here, there, everywhere'
       })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('succes');
        expect(res.body.data.message).to.equal('User account created successfully');
        expect(res.body.data.userId).to.equal(userId);
        done();
      });
  });
});