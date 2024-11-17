import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { protect } from "./utils/auth";
import router from "./router";
import {
  createPlayer,
  googleSignIn,
  googleSignInCallback,
  signIn,
} from "./handlers/player";
import config from "./config";
import https from "https";
import { readFileSync } from "fs";
import path from "path";
import helmet from "helmet";
import cookieSession from "cookie-session";

dotenv.config();
const app = express();

app.use(helmet());
app.use(
  cookieSession({
    name: process.env.COOKIE_NAME,
    maxAge: 60 * 60 * 24 * 1000,
    keys: [
      process.env.COOKIE_SECRET_KEY,
      process.env.COOKIE_SECRET_ROTATION_KEY,
    ],
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Moodify Backend APIs");
});

app.use("/api", protect(), router);

app.post("/auth/login", signIn);
app.post("/auth/register", createPlayer);
app.get("/auth/google", googleSignIn);
app.get("/auth/google/callback", googleSignInCallback);

app.use((err, req, res, next) => {
  if (err?.type === "auth") {
    return res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    return res.status(401).json({ message: "Invalid Input" });
  } else if (err.type === "input") {
    return res.status(401).json({ message: "Invalid Input" });
  } else {
    res.status(500).json({ message: "There's someting wrong" });
  }
});

https
  .createServer(
    {
      key: readFileSync(path.join(__dirname, "key.pem"), "utf-8"),
      cert: readFileSync(path.join(__dirname, "cert.pem"), "utf-8"),
    },
    app
  )
  .listen(config.port, () => {
    console.log(`[Server] Listening to port ${config.port}`);
  });

export default app;
