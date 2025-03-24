import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization

    try {
        if (!token) {
            return res.status(401).json("Access refused : no token provided");
        }

        const verify = await jwt.verify(token.split(" ")[1], JWT_SECRET);

        if (!verify) {
            return res.status(401).json("Access refused : invalid token");
        }
        //req.user = verify;
        next();
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ error: "Invalid token : incorrect signature" });
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ error: "Token expired, please login again" });
        }
        return res.status(500).json({ error: "Error while verifating the token" });
    }
};