// Core
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
// Inngest
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onSignup } from "./inngest/functions/onSignup.js";
import { onTicketCreate } from "./inngest/functions/onTicketCreate.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully ✅");
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/inngest", serve({
    client: inngest,
    functions: [onSignup, onTicketCreate]
})
)
    
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});