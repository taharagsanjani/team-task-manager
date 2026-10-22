import { Router } from "express";
import { validateUser } from "../validators/user.js";
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
    res.status(200).json({
      username: result.data.username,
      email: result.data.email,
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
