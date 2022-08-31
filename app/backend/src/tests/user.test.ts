const chai = require("chai");
const chaiHttp = require("chai-http");
import { Response } from "superagent";
import { describe, before, it } from "mocha";

import app from "../app";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testando a rota GET /login/validate", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).post("/login").send({
      email: "admin@admin.com",
      password: "secret_admin",
    });

    response = await chai
      .request(app)
      .get("/login/validate")
      .set({ Authorization: response.body.token })
      .send();
  });

  it("Espera que o status seja 200", async () => {
    expect(response).to.have.status(200);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("role");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.role).to.be.equal("admin");
  });
});

describe("Testando a rota GET /login/validate, sem o token", () => {
  let response: Response;

  before(async () => {
    //   response = await chai
    //  .request(app)
    //  .post('/login')
    //  .send({
    //   "email": "admin@admin.com",
    //   "password": "secret_admin"})

    response = await chai.request(app).get("/login/validate").send();
  });

  it("Espera que o status seja 401", async () => {
    expect(response).to.have.status(401);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("message");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.message).to.be.equal("Token not found");
  });
});

describe("Testando a rota GET /login/validate, com o token invalido", () => {
  let response: Response;

  before(async () => {
    response = await chai
      .request(app)
      .get("/login/validate")
      .set({ Authorization: "xablau" })
      .send();
  });

  it("Espera que o status seja 401", async () => {
    expect(response).to.have.status(401);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("message");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.message).to.be.equal("Token must be a valid token");
  });
});

describe("Testando a rota POST /login", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).post("/login").send({
      email: "admin@admin.com",
      password: "secret_admin",
    });
  });

  it("Espera que o status seja 200", async () => {
    expect(response).to.have.status(200);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o primeiro elemento do array tenha as propriedades corretas", async () => {
    expect(response.body).to.have.property("token");
  });
});

describe("Testando a rota POST /login, sem email", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).post("/login").send({
      password: "secret_admin",
    });
  });

  it("Espera que o status seja 400", async () => {
    expect(response).to.have.status(400);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("message");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.message).to.be.equal("All fields must be filled");
  });
});

describe("Testando a rota POST /login, sem password", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).post("/login").send({
      email: "admin@admin.com",
    });
  });

  it("Espera que o status seja 400", async () => {
    expect(response).to.have.status(400);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("message");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.message).to.be.equal("All fields must be filled");
  });
});

describe("Testando a rota POST /login, com email invalido", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).post("/login").send({
      email: "adminadmin.com",
      password: "secret_admin",
    });
  });

  it("Espera que o status seja 400", async () => {
    expect(response).to.have.status(400);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("message");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.message).to.be.equal("Field email invalid");
  });
});

describe("Testando a rota POST /login, com email vazio", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).post("/login").send({
      email: "",
      password: "secret_admin",
    });
  });

  it("Espera que o status seja 400", async () => {
    expect(response).to.have.status(400);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("message");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.message).to.be.equal("All fields must be filled");
  });
});

describe("Testando a rota POST /login, email inexistente", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).post("/login").send({
      email: "xablau@admin.com",
      password: "secret_admin",
    });
  });

  it("Espera que o status seja 401", async () => {
    expect(response).to.have.status(401);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("message");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.message).to.be.equal("Incorrect email or password");
  });
});

describe("Testando a rota POST /login, com password invalido", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).post("/login").send({
      email: "admin@admin.com",
      password: "secretadmin",
    });
  });

  it("Espera que o status seja 401", async () => {
    expect(response).to.have.status(401);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("message");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.message).to.be.equal("Incorrect email or password");
  });
});

describe("Testando a rota POST /login, com password vazio", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).post("/login").send({
      email: "admin@admin.com",
      password: "",
    });
  });

  it("Espera que o status seja 400", async () => {
    expect(response).to.have.status(400);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("message");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.message).to.be.equal("All fields must be filled");
  });
});
