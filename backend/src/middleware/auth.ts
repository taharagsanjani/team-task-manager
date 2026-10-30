import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (!token) {
    res.status(401).json({ message: "توکن ارسال نشده است." });
    return;
  }
  if (!token.startsWith("Bearer ")) {
    res.status(401).json({ message: "توکن معتبر نیست." });

    return;
  }
  const splitedToken = token.split(" ")[1];

  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret === undefined) {
    throw Error("secret is missing");
  }
  try {
    const payload = jwt.verify(splitedToken, jwtSecret);
    if (typeof payload === "string") {
      res.status(401).json({ message: "توکن معتبر نیست." });
      return;
    }
    req.userId = payload.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "توکن معتبر نیست." });
    return;
  }
};
