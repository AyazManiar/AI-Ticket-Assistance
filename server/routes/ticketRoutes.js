import express from "express";
import { authenticate } from "../middleware/auth.js";
import { createTicket, getTickets, getTicket } from "../controllers/ticket.js";

const router = express.Router();

router.post("/create-ticket", authenticate, createTicket);
router.get("/get-tickets", authenticate, getTickets);
router.get("/get-ticket/:id", authenticate, getTicket);

export default router;