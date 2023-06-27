import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const [, token] = req.headers.authorization?.split(" ") ?? "";
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const userId = decoded.id;
    res.locals.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
