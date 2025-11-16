import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed },
    })

    res.status(201).json({
      message: "User created",
      user: { id: user.id, email: user.email }
    })
  } catch (error) {
    res.status(400).json({ error: "Email already exists" })
  }
}

export const login = (req: Request, res: Response) => {
  res.status(501).json({ error: "Not implemented" });
}