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

describe("Testando a rota GET /leaderboard/home", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).get("/leaderboard/home").send();
  });

  it("Espera que o status seja 200", async () => {
    expect(response).to.have.status(200);
  });

  it("Espera que a resposta seja um array", async () => {
    expect(response.body).to.be.an("array");
  });

  it("Espera que o primeiro elemento do array tenha as propriedades corretas", async () => {
    expect(response.body[0]).to.have.property("name");
    expect(response.body[0]).to.have.property("totalPoints");
    expect(response.body[0]).to.have.property("totalGames");
    expect(response.body[0]).to.have.property("totalVictories");
    expect(response.body[0]).to.have.property("totalDraws");
    expect(response.body[0]).to.have.property("totalLosses");
    expect(response.body[0]).to.have.property("goalsFavor");
    expect(response.body[0]).to.have.property("goalsOwn");
    expect(response.body[0]).to.have.property("goalsBalance");
    expect(response.body[0]).to.have.property("efficiency");
  });

  it("Espera que o primeiro elemento do array tenha os valores corretos", async () => {
    expect(response.body[0]).to.deep.equal({
      name: "Santos",
      totalPoints: 9,
      totalGames: 3,
      totalVictories: 3,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 9,
      goalsOwn: 3,
      goalsBalance: 6,
      efficiency: "100.00",
    });
  });
});

describe("Testando a rota GET /leaderboard/away", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).get("/leaderboard/away").send();
  });

  it("Espera que o status seja 200", async () => {
    expect(response).to.have.status(200);
  });

  it("Espera que a resposta seja um array", async () => {
    expect(response.body).to.be.an("array");
  });

  it("Espera que o primeiro elemento do array tenha as propriedades corretas", async () => {
    expect(response.body[0]).to.have.property("name");
    expect(response.body[0]).to.have.property("totalPoints");
    expect(response.body[0]).to.have.property("totalGames");
    expect(response.body[0]).to.have.property("totalVictories");
    expect(response.body[0]).to.have.property("totalDraws");
    expect(response.body[0]).to.have.property("totalLosses");
    expect(response.body[0]).to.have.property("goalsFavor");
    expect(response.body[0]).to.have.property("goalsOwn");
    expect(response.body[0]).to.have.property("goalsBalance");
    expect(response.body[0]).to.have.property("efficiency");
  });
  it("Espera que o primeiro elemento do array tenha os valores corretos", async () => {
    expect(response.body[0]).to.deep.equal({
      name: "Palmeiras",
      totalPoints: 6,
      totalGames: 2,
      totalVictories: 2,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 7,
      goalsOwn: 0,
      goalsBalance: 7,
      efficiency: "100.00",
    });
  });
});

describe("Testando a rota GET /leaderboard", () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).get("/leaderboard").send();
  });

  it("Espera que o status seja 200", async () => {
    expect(response).to.have.status(200);
  });

  it("Espera que a resposta seja um array", async () => {
    expect(response.body).to.be.an("array");
  });

  it("Espera que o primeiro elemento do array tenha as propriedades corretas", async () => {
    expect(response.body[0]).to.have.property("name");
    expect(response.body[0]).to.have.property("totalPoints");
    expect(response.body[0]).to.have.property("totalGames");
    expect(response.body[0]).to.have.property("totalVictories");
    expect(response.body[0]).to.have.property("totalDraws");
    expect(response.body[0]).to.have.property("totalLosses");
    expect(response.body[0]).to.have.property("goalsFavor");
    expect(response.body[0]).to.have.property("goalsOwn");
    expect(response.body[0]).to.have.property("goalsBalance");
    expect(response.body[0]).to.have.property("efficiency");
  });
  it("Espera que o primeiro elemento do array tenha os valores corretos", async () => {
    expect(response.body[0]).to.deep.equal({
      name: "Palmeiras",
      totalPoints: 13,
      totalGames: 5,
      totalVictories: 4,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: 17,
      goalsOwn: 5,
      goalsBalance: 12,
      efficiency: "86.67",
    });
  });
});
