import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { getUserProfile } from "../controllers/usersController.js";


const usersRouter = Router();

usersRouter.get("/profile", verifyUser, getUserProfile);

export default usersRouter;