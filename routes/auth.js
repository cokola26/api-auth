import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { createUser, loginUser } from "../controllers/authController.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET;

authRouter.post("/register", createUser);

authRouter.post("/login", loginUser);




export default authRouter;