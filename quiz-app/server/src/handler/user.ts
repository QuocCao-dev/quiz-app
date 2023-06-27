import { Request, RequestHandler } from "express";
import { genSalt, hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma";
import { LoginSchemaBody, RegisterSchemaBody } from "../schema/user";

export const registerHandler: RequestHandler = async (
  req: Request<{}, {}, RegisterSchemaBody>,
  res
) => {
  try {
    const { email, name, password, isAdmin } = req.body;
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        isAdmin,
      },
    });

    res.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginHandler: RequestHandler = async (
  req: Request<{}, {}, LoginSchemaBody>,
  res
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.json({
    message: "User logged in successfully",
    success: true,
    data: token,
  });
};

export const getUserInfoHandler: RequestHandler = async (req, res) => {
  try {
    const userId = res.locals.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: +userId },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
      },
    });

    res.json({
      message: "User info retrieved successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
