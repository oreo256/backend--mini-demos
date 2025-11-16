import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = "secret-key";

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: "Invalid credentails" });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({ message: "Login successful", token });
}