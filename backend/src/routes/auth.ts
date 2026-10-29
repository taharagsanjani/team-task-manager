import { Router } from "express";
import { validateUser, validateLogin } from "../validators/user.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = Router();

router.post("/signup", async (req, res) => {
  const result = validateUser(req.body);
  try { 
    if (result.success === false) {
      res.status(400).json({
        message: result.error,
      });
      return;
    }

    const existingEmail = await UserModel.findOne({ email: result.data.email });

    if (existingEmail !== null) {
      res.status(409).json({
        message: "این ایمیل قبلاً ثبت شده.",
      });
      return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(result.data.password, saltRounds);

    const user = await UserModel.create({
      username: result.data.username,
      email: result.data.email,
      passwordHash,
    });

    res.status(201).json({
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ثبت نام انجام نشد",
    });
    return;
  }
});

router.post("/login", async (req, res) => {
  const result = validateLogin(req.body);

  try {
    if (result.success === false) {
      res.status(400).json({
        message: result.error,
      });
      return;
    }

    const userData = await UserModel.findOne({ email: result.data.email });

    if (userData === null) {
      res.status(401).json({
        message: "ایمیل یا رمز اشتباه است.",
      });
      return;
    }
    const isMatch = await bcrypt.compare(
      result.data.password,
      userData.passwordHash,
    );
    if (isMatch === false) {
      res.status(401).json({
        message: "ایمیل یا رمز اشتباه است.",
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret === undefined) {
      throw Error("secret is missing");
    }
    const jwToken = jwt.sign({ id: userData.id }, jwtSecret, {
      expiresIn: "12h",
    });
    res.status(200).json({
      data: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        token: jwToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " ورود انجام نشد",
    });
    return;
  }
});

export default router;
