import { Router } from "express";
import { verifyUser } from "../middlewares/authMiddleware.js";

const eventsRouter = Router();

eventsRouter.get("/events", verifyUser, (req, res) => {
    res.send("Welcome to my events");
});

export default eventsRouter;