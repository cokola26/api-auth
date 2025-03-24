import express from "express";
import 'dotenv/config';
import connectDB from "./database/client.js";
import authRouter from "./routes/auth.js";
import eventsRouter from "./routes/events.js";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", authRouter);


app.get("/", (req, res) => {
    res.send("Welcome to my event api");
});


connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});