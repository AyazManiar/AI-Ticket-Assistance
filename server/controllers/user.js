import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { inngest } from "../inngest/client.js";

// POST
export const signup = async (req, res) => {
    const { email, password, skills = [] } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ email, password: hashedPassword, skills });

        // Fire Ingest event for user signup
        // Your choice to await or not
        inngest.send({
            name: "user/signup",
            data: {
                email: email
            }
        })

        // Log the user in
        const token = jwt.sign( 
            { _id: user._id, role: user.role},
            process.env.JWT_SECRET,
        )
        res.json({ user, token})
    } catch (error) {
        res.status(500).json({ error: "Signup failed", details: error.message });
    }
}

// POST
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ error: "User not found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({ error: "Invalid credentials" });
        // Log the user in
        const token = jwt.sign( 
            { _id: user._id, role: user.role},
            process.env.JWT_SECRET,
        )
        res.json({ user, token})
    } catch (error) {
        res.status(500).json({ error: "Login failed", details: error.message });
    }
}

// POST
export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(401).json({error: "Unauthorized"})
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err) return res.status(401).json({error: "Unauthorized"}) 
            res.json({ message: "Logged out successfully" })
        })
    } catch (error) {
        res.status(500).json({ error: "Logout failed", details: error.message });
    }
}

// PUT
export const updateUser = async (req, res) => {
    const { skills = [], role, email } = req.body;
    try {
        if(req.user?.role !== "admin"){
            return res.status(403).json({ error: "Forbidden" });
        }
        const user = await User.findOne({ email })
        if(!user) return res.status(404).json({ error: "User not found" });
        await User.updateOne(
            { email }, // Find user by email
            // Update skills and role
            { skills: skills.length ? skills : user.skills,
              role: role || user.role 
            } 
        )
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Update failed", details: error.message });
    }
}

// GET
export const getUser = async (req, res) => {
    const { email } = req.body;
    if(!email) return res.status(400).json({ error: "Email is required" });
    if(req.user?.role !== "admin"){
        return res.status(403).json({ error: "Forbidden" });
    }
    try {
        const user = await User.findOne({ email: email}).select("-password");
        if(!user) return res.status(404).json({ error: "User not found" });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user", details: error.message });
    }
}

// Function
export const getAppropriateModerator = async (relatedSkills) => {
    try {
        const highestSkillMatch = { person: null, matchCount: 0 };

        // Only select _id and skills (no email needed)
        const moderatorsList = await User.find({ role: "moderator" }).select("_id email skills");

        moderatorsList.forEach(moderator => {
            const skillMatchCount = relatedSkills.filter(skill =>
                moderator.skills.includes(skill)
            ).length;

            if (skillMatchCount > highestSkillMatch.matchCount) {
                highestSkillMatch.person = moderator._id;
                highestSkillMatch.matchCount = skillMatchCount;
            }
        });

        // If no matching moderator, fallback to an admin
        if (highestSkillMatch.matchCount === 0) {
            try {
                const admin = await User.findOne({ role: "admin" }).select("_id email");
                highestSkillMatch.person = admin || null;
            } catch (error) {
                throw new Error("Failed to fetch admins: " + error.message);
            }
        }

        return highestSkillMatch.person;
    } catch (error) {
        throw new Error("Failed to fetch moderators: " + error.message);
    }
};
