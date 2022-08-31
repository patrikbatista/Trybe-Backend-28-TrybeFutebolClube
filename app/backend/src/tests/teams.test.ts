const chai = require('chai');
const chaiHttp = require('chai-http');
import {Response} from 'superagent';

import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /teams', () => {

  let response: Response;

  beforeEach(async () => {
    response = await chai
   .request(app)
   .get('/teams')
   .send()
  })

  it('Espera que o status seja 200', async () => { 
    expect(response).to.have.status(200);
  });

  it('Espera que a resposta seja um array', async () => {
    expect(response.body).to.be.an('array');
  });

  it('Espera que o primeiro elemento do array tenha as propriedades corretas', async () => {
    expect(response.body[0]).to.have.property('id');
    expect(response.body[0]).to.have.property('teamName');
  });
});

describe('Testando a rota /teams/5', () => {

  let response: Response;

  beforeEach(async () => {
    response = await chai
   .request(app)
   .get('/teams/5')
   .send()
  })

  it('Espera que o status seja 200', async () => { 
    expect(response).to.have.status(200);
  });

  it('Espera que a resposta seja um object', async () => {
    expect(response.body).to.be.an('object');
  });

  it('Espera que o objeto tenha as chaves corretas', async () => {
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('teamName');
  });

  it('Espera que o objeto os valores corretos', async () => {
    expect(response.body.id).to.be.equal(5);
    expect(response.body.teamName).to.be.equal('Cruzeiro');
  });
});

describe('Testando a rota /teams/200', () => {

  let response: Response;

  beforeEach(async () => {
    response = await chai
   .request(app)
   .get('/teams/200')
   .send()
  })

  it('Espera que o status seja 404', async () => { 
    expect(response).to.have.status(404);
  });

  it('Espera que a resposta seja um object', async () => {
    expect(response.body).to.be.an('object');
  });

  it('Espera que o objeto tenha as chaves corretas', async () => {
    expect(response.body).to.have.property('message');
  });

  it('Espera que o objeto tenha os valores corretos', async () => {
    expect(response.body.message).to.be.equal('Team not found');
  });
});
