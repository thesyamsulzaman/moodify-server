import * as player from "../player";
import { prismaMock } from "../../../mock";
import request from "supertest";
import app from "../../index";
import prisma from "../../db";
import jwt from "jsonwebtoken";
import { hashPassword } from "../../utils/auth";

const mockPlayer = {
  email: "thesyamsulzaman@gmail.com",
  password: "secrettest",
};

describe("/auth", () => {
  describe('[POST] /auth/register"', () => {
    it("should respond with a `200` status code and user token", async () => {
      const { body, status } = await request(app)
        .post("/auth/register")
        .send(mockPlayer)
        .expect("Content-Type", /json/)
        .expect(200);

      const newPlayer = await prisma.player.findFirst();

      expect(status).toBe(200);
      expect(newPlayer).not.toBe(null);
      expect(body).toHaveProperty("token");
    });

    it("should respond with a `401` status code if a user exists with the provided email", async () => {
      await prisma.player.create({
        data: mockPlayer,
      });

      const { body, status } = await request(app)
        .post("/auth/register")
        .send(mockPlayer);

      const count = await prisma.player.count();

      expect(status).not.toBe(200);
      expect(count).toBe(1);
      expect(body).not.toHaveProperty("token");
    });
  });

  describe('[POST] /auth/login"', () => {
    beforeEach(async () => {
      await prisma.player.create({
        data: {
          email: mockPlayer.email,
          password: await hashPassword(mockPlayer.password),
        },
      });
    });

    it("should respond with a `200` status code when provided valid credentials", async () => {
      const { body, status } = await request(app)
        .post("/auth/login")
        .send(mockPlayer)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(status).toBe(200);
      expect(body).toHaveProperty("token");
      expect(jwt.verify(body.token, process.env.JWT_SECRET_KEY as string));
    });

    it("should respond with a `400` status code when given invalid credentials", async () => {
      const { body, status } = await request(app).post("/auth/login").send({
        username: "testusername",
        password: "wrongpassword",
      });

      expect(status).toBe(500);
      expect(body).not.toHaveProperty("token");
    });

    it("should respond with a `400` status code when the user cannot be found", async () => {
      const { body, status } = await request(app).post("/auth/login").send({
        username: "wrongusername",
        password: "testpassword",
      });

      expect(status).toBe(500);
      expect(body).not.toHaveProperty("token");
    });
  });
});
