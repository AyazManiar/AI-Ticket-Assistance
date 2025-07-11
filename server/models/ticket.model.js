import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {type: String, default: "TODO", enum: ["TODO", "IN_PROGRESS", "DONE"]},
    priority: {type: String, default: "LOW", enum: ["LOW", "MEDIUM", "HIGH"]},
    createdAt: {type: Date, default: Date.now},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: "Moderator", default: null},
    deadline: Date,
    helpfulNotes: String,
    relatedSkills: [String],
})

export default mongoose.model("Ticket", ticketSchema);