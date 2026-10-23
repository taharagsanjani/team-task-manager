import { Router } from "express";
import { validateUser } from "../validators/user.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

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

export default router;
