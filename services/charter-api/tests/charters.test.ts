import { expect } from "chai";
import request from "supertest";
import express from "express";
import { chartersRouter } from "../src/routes/charters";

describe("charter-api", () => {
  const app = express();
  app.use(express.json());
  app.use("/charters", chartersRouter);

  it("creates a commitment from charter payload", async () => {
    const res = await request(app)
      .post("/charters")
      .send({
        subjectDid: "did:example:subject",
        bundleCode: "NEURORIGHTS_V1",
        jurisdiction: "US-AZ",
        charter: { sections: [] }
      });

    expect(res.status).to.eq(201);
    expect(res.body.charterHash).to.be.a("string");
    expect(res.body.subjectDidHash).to.be.a("string");
  });
});
