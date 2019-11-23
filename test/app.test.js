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
