const chai = require("chai");
const chaiHttp = require("chai-http");
import { Response } from "superagent";
import * as shell from "shelljs";
import { describe, before, it } from "mocha";

import app from "../app";

chai.use(chaiHttp);

const { expect } = chai;

shell.exec("npx sequelize-cli db:drop");
shell.exec("npx sequelize-cli db:create");
shell.exec("npx sequelize-cli db:migrate");
shell.exec("npx sequelize-cli db:seed:all");

describe("Testando a rota GET /matches", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).get("/matches").send();
  });

  it("Espera que o status seja 200", async () => {
    expect(response).to.have.status(200);
  });

  it("Espera que a resposta seja um array", async () => {
    expect(response.body).to.be.an("array");
  });

  it("Espera que o primeiro elemento do array tenha as propriedades corretas", async () => {
    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("homeTeam");
    expect(response.body[0]).to.have.property("homeTeamGoals");
    expect(response.body[0]).to.have.property("awayTeam");
    expect(response.body[0]).to.have.property("awayTeamGoals");
    expect(response.body[0]).to.have.property("teamHome");
    expect(response.body[0]).to.have.property("teamAway");
    expect(response.body[0]).to.have.property("inProgress");
  });
});

describe("Testando a rota GET /matches/5", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).get("/matches/5").send();
  });

  it("Espera que o status seja 200", async () => {
    expect(response).to.have.status(200);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("homeTeam");
    expect(response.body).to.have.property("homeTeamGoals");
    expect(response.body).to.have.property("awayTeam");
    expect(response.body).to.have.property("awayTeamGoals");
    expect(response.body).to.have.property("teamHome");
    expect(response.body).to.have.property("teamAway");
    expect(response.body).to.have.property("inProgress");
  });

  it("Espera que o objeto os valores corretos", async () => {
    expect(response.body).to.deep.equal({
      id: 5,
      homeTeam: 7,
      homeTeamGoals: 1,
      awayTeam: 10,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "Flamengo",
      },
      teamAway: {
        teamName: "Minas Brasília",
      },
    });
  });
});

describe("Testando a rota GET /matches/200", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).get("/matches/200").send();
  });

  it("Espera que o status seja 404", async () => {
    expect(response).to.have.status(404);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("message");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.message).to.be.equal("Match not found");
  });
});

describe("Testando a rota POST /matches", () => {
  let response: Response;

  before(async () => {
    response = await chai
      .request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "secret_admin" });

    response = await chai
      .request(app)
      .post("/matches")
      .set({ Authorization: response.body.token })
      .send({
        homeTeam: 2,
        awayTeam: 1,
        homeTeamGoals: 3,
        awayTeamGoals: 6,
        inProgress: true,
      });
  });

  it("Espera que o status seja 201", async () => {
    expect(response).to.have.status(201);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("homeTeam");
    expect(response.body).to.have.property("homeTeamGoals");
    expect(response.body).to.have.property("awayTeam");
    expect(response.body).to.have.property("awayTeamGoals");
    expect(response.body).to.have.property("inProgress");
  });

  it("Espera que o objeto os valores corretos", async () => {
    expect(response.body).to.deep.equal({
      id: 49,
      homeTeam: 2,
      awayTeam: 1,
      homeTeamGoals: 3,
      awayTeamGoals: 6,
      inProgress: true,
    });
  });
});

describe("Testando a rota POST /matches, sem inProgress", () => {
  let response: Response;

  before(async () => {
    response = await chai
      .request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "secret_admin" });

    response = await chai
      .request(app)
      .post("/matches")
      .set({ Authorization: response.body.token })
      .send({
        homeTeam: 2,
        awayTeam: 1,
        homeTeamGoals: 3,
        awayTeamGoals: 6,
      });
  });

  it("Espera que o status seja 201", async () => {
    expect(response).to.have.status(201);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("homeTeam");
    expect(response.body).to.have.property("homeTeamGoals");
    expect(response.body).to.have.property("awayTeam");
    expect(response.body).to.have.property("awayTeamGoals");
    expect(response.body).to.have.property("inProgress");
  });

  it("Espera que o objeto os valores corretos", async () => {
    expect(response.body).to.deep.equal({
      id: 50,
      homeTeam: 2,
      awayTeam: 1,
      homeTeamGoals: 3,
      awayTeamGoals: 6,
      inProgress: true,
    });
  });
});

describe("Testando a rota POST /matches, sem o homeTeam", () => {
  let response: Response;

  before(async () => {
    response = await chai
      .request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "secret_admin" });

    response = await chai
      .request(app)
      .post("/matches")
      .set({ Authorization: response.body.token })
      .send({
        awayTeam: 1,
        homeTeamGoals: 3,
        awayTeamGoals: 6,
        inProgress: true,
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
    expect(response.body.message).to.be.equal("Teams id is required");
  });
});

describe("Testando a rota POST /matches, sem o awayTeam", () => {
  let response: Response;

  before(async () => {
    response = await chai
      .request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "secret_admin" });

    response = await chai
      .request(app)
      .post("/matches")
      .set({ Authorization: response.body.token })
      .send({
        homeTeam: 2,
        homeTeamGoals: 3,
        awayTeamGoals: 6,
        inProgress: true,
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
    expect(response.body.message).to.be.equal("Teams id is required");
  });
});

describe("Testando a rota POST /matches, sem o homeTeamGoals", () => {
  let response: Response;

  before(async () => {
    response = await chai
      .request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "secret_admin" });

    response = await chai
      .request(app)
      .post("/matches")
      .set({ Authorization: response.body.token })
      .send({
        homeTeam: 2,
        awayTeam: 1,
        awayTeamGoals: 6,
        inProgress: true,
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
    expect(response.body.message).to.be.equal("Goals is required");
  });
});

describe("Testando a rota POST /matches, sem o awayTeamGoals", () => {
  let response: Response;

  before(async () => {
    response = await chai
      .request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "secret_admin" });

    response = await chai
      .request(app)
      .post("/matches")
      .set({ Authorization: response.body.token })
      .send({
        homeTeam: 2,
        awayTeam: 1,
        homeTeamGoals: 3,
        inProgress: true,
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
    expect(response.body.message).to.be.equal("Goals is required");
  });
});

describe("Testando a rota PATCH /matches/5", () => {
  let response: Response;

  before(async () => {
    response = await chai
      .request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "secret_admin" });

    response = await chai
      .request(app)
      .patch("/matches/5")
      .set({ Authorization: response.body.token })
      .send({
        homeTeamGoals: "5",
        awayTeamGoals: "5",
      });
  });

  it("Espera que o status seja 200", async () => {
    expect(response).to.have.status(200);
  });

  it("Espera que a resposta seja um object", async () => {
    expect(response.body).to.be.an("object");
  });

  it("Espera que o objeto tenha as chaves corretas", async () => {
    expect(response.body).to.have.property("message");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.message).to.be.equal("Match up");
  });
});

describe("Testando a rota PATCH /matches/41/finish", () => {
  let response: Response;

  before(async () => {
    response = await chai
      .request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "secret_admin" });

    response = await chai
      .request(app)
      .patch("/matches/41/finish")
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
    expect(response.body).to.have.property("message");
  });

  it("Espera que o objeto tenha os valores corretos", async () => {
    expect(response.body.message).to.be.equal("Finished");
  });
});
