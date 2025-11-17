import express from "express";
import { Request,Response } from "express";

const router = express.Router();

router.get("/profile", (req:Request, res:Response) =>{
  res.status(501).json({error: "profile not implemented"});
})

export default router;