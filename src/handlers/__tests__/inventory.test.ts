import request from "supertest";
import app from "../../index";

describe("Testing inventories handler", () => {
  it("It should respond with 200 success", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
