import { inngest } from "../inngest/client.js"
import  Ticket from "../models/ticket.model.js";

// POST
export const createTicket = async (req, res) => {
    try {
        const {title, description, userId } = req.body;
        userId = userId.toString();
        if(!title || !description || !userId) {
            return res.status(400).json({message: "Title, description and userId are required"});
        }
        const newTicket = await Ticket.create({
            title,
            description,
            createdBy: userId
        })
        // Trigger the Inngest function to handle ticket creation
        await inngest.send({
            name: "ticket/created",
            data: {
                ticketId: newTicket._id.toString(),
            }
        });
        return res.status(201).json({
            message: "Ticket created successfully",
            ticketId: newTicket
        }); 
    } catch (error) {
        console.error("Error creating ticket:", error);
        return res.status(500).json({message: "Internal  server error"});
    }
}

// GET
export const getTickets = async (req, res) => {
    try {
        const { user } = req.user
        let tickets = []
        if(user.role !== "user"){
            tickets = await Ticket.find({})
            .populate("createdBy", ["email", "_id"])
            .sort({createdAt: -1});
        } else{
            tickets = await Ticket.find({ createdBy: user._id })
            .select("title description status createdAt")
            .sort({createdAt: -1})
        }
        if(tickets.length === 0) {
            return res.status(404).json({message: "Tickets not found"});
        }
        return res.status(200).json({
            tickets: tickets
        });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// GET
export const getTicket = async (req, res) => {
    try {
        const { user } = req.user;
        let ticket;
        if(user.role !== "user"){
            ticket = await Ticket.findById(req.params.id)
            .populate("assignedTo", ["email", "_id"])
        }
        else {
            ticket = await Ticket.findOne(
                {createdBy: user._id, _id: req.params.id}
            ).select("title description status createdAt");
        }
        if(!ticket) {
            return res.status(404).json({message: "Ticket not found"});
        }
        return res.status(200).json({
            ticket: ticket
        });
    } catch (error) {
        
    }
}