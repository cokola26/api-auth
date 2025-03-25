import { Router } from "express";
import { getAllServices } from "../controllers/servicesController.js";
import { verifyUser } from "../middlewares/authMiddleware.js";
import { createService } from "../controllers/servicesController.js";

const servicesRouter = Router();

servicesRouter.get("/services", getAllServices);
servicesRouter.post("/services", verifyUser, createService);

export default servicesRouter;
