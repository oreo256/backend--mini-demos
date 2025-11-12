import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express";

const prisma = new PrismaClient();

export const getAllPosts = async (req: Request, res:Response) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
}

export const getPostById = async (req: Request, res: Response) => {
  const {id} = req.params;
  const post = await prisma.post.findUnique({where: {id: Number(id)}});
  if (!post) return res.status(404).json({error: "Post not found"});
  res.json(post);
}

export const createPost = async (req: Request, res: Response) => {
  const {title, content} = req.body;
  const post = await prisma.post.create({
    data: {title, content},
  });
  res.status(201).json(post);
}

export const updatePost = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {title, content} = req.body;
  try {
    const post = await prisma.post.update({
      where: { id:Number(id)},
      data: {title, content},
    });
    res.json(post);
  } catch {
    res.status(404).json({error: "Post not found"});
  }
}

export const deletePost = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    await prisma.post.delete({where: {id: Number(id)}});
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Post not found"});
  }
}