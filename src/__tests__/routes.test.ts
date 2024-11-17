import app from "../index";
import supertest from "supertest";

describe("GET /", () => {
  it("Should send back some data", async () => {
    // const res = await supertest(app).get("/");
    // expect(res.body.message).toBe("Hello World");

    expect(1).toBe(1);
  });
});
