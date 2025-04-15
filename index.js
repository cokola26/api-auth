import express from "express";
import 'dotenv/config';
import connectDB from "./database/client.js";
import authRouter from "./routes/auth.js";
import eventsRouter from "./routes/events.js";
import servicesRouter from "./routes/services.js";
import cors from "cors";
import { verifyUser } from "./middlewares/verifyUser.js";
import usersRouter from "./routes/users.js";

import fs from 'fs';

const PORT = process.env.PORT || 8000;

const app = express();


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("public/images"));



app.use("/api", authRouter, eventsRouter, servicesRouter, usersRouter);


app.get("/", verifyUser, (req, res) => {
    res.send("Welcome to my event api");
});

app.get('public/images/:filename', (req, res) => {
    const file = `public/images/${req.params.filename}`;
    res.sendFile(path.resolve(file));
});

app.get('/images', (req, res) => {
    fs.readdir('public/images', (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: err });
        }
        res.send({ images: files });
    });
})

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});