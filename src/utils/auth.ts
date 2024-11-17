import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: any) => {
  const token = jwt.sign(
    {
      id: user?.id,
      username: user?.username,
    },
    process.env.JWT_SECRET_KEY as string
  );

  return token;
};

export const protect = () => (req: any, res: any, next: any) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({
      message: "Not Authorized",
    });

    return;
  }

  const token = bearer?.split(" ")[1];

  if (!token) {
    res.status(401);
    res.json({
      message: "Not Valid Token",
    });

    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.user = user;

    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({
      message: "Not Valid Token",
    });

    return;
  }
};
