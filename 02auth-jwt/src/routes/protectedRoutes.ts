import express from "express";
import { Request, Response } from "express";
import { requireAuth } from "../middlewares/auth";

const router = express.Router();

router.get("/profile", requireAuth, (req: Request, res: Response) => {
  res.json({ message: "This is a protected route", user: (req as any).user });
})

export default router;