import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token", details: error.message });
    }
}
