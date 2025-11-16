import { Request, Response, NextFunction } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  return res.status(501).json({error: "auth middleware not implemnted"});
}