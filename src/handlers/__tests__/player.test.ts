import * as player from "../player";

describe("player handler", () => {
  it("Should create a new player", async () => {
    const req = { body: { username: "syamsul", password: "secrettest" } };
    const res = {
      json: ({ token }) => {
        expect(token).toBeTruthy();
      },
    };

    await player.createPlayer(req, res, (args) => {});
    // expect(1).toBe(1);
  });
});
