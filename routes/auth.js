import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET;

authRouter.post("/register", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        //Search in our DB where the email could match the req.body.email (the email given by the user)
        const emailVerification = await User.findOne({ email });
        if (emailVerification) {
            return res.status(409).json("Email already taken");
        }

        const saltPassword = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltPassword);

        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        // if await new User, it must be saved. Otherwise, with User.create, there's no need to save it, it's automatic ( newUser.save(); )

        return res.status(201).json(`Welcome to our event manager ${first_name}`);
    } catch (err) {
        console.log(err)
        return res.status(500).json(`Internal server error: ${err}`);
    }
})

authRouter.post("/login", async (req, res) => {
    // We destructure the req.body.form
    const { email, password } = req.body;
    try {
        // We search in our DB where the email could match the req.body.email (the email given by the user)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json("Email or password invalid");
        }
        //We compare the password hash value given by the req.body.password with the user.password hashed value
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(401).json("Email or password invalid");
        }

        const token = await jwt.sign({id: user._id}, JWT_SECRET);
        return res.status(200).json({ token });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(`Internal server error: ${err}`);
    }
}
)
export default authRouter;