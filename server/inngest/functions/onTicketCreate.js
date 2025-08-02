import { inngest } from "../client.js";
import Ticket from "../../models/ticket.model.js";
import { NonRetriableError } from "inngest";
import analyzeTicket from "../../utils/aiAgent.js";
// Custom function
import { getAppropriateModerator } from "../../controllers/user.js";
// Mail
import { sendMail } from "../../utils/mail.js";

export const onTicketCreate = inngest.createFunction(
    {id: "on-ticket-create", retries: 3},
    {event: "ticket/created"},
    async ({ event, step }) => {
        try {
            const { ticketId } = event.data;
            // Step 1: Check if ticket exists
            const ticket = await step.run("get-ticket", 
                async () => {
                    const ticketObject = await Ticket.findById(ticketId);
                    if (!ticketObject) {
                        throw new NonRetriableError("Ticket not found in the database");
                    }
                    return ticketObject;
                }
            );
            // Step 2: Send the ticket to AI Agent to create Metadata
            const aiResponse = await step.run("send-ticket-to-ai-agent", 
                async()=>{
                    const response = await analyzeTicket(ticket)
                    if (!response) {
                        throw new NonRetriableError("AI Agent failed to analyze the ticket");
                    }
                    return response;
                }
            )
            // Step 3; Update the ticket on Database with AI Metadata
            const relatedSkills = await step.run("update-ticket-with-ai-metadata", 
                async () => {
                    const priority = !["low", "medium", "high"].includes(aiResponse.priority.toLowerCase()) ? "MEDIUM" : aiResponse.priority.toUpperCase();
                    const skills = aiResponse.relatedSkills || [];
                    await Ticket.updateOne(
                        { _id: ticket._id },
                        { 
                            priority: priority,
                            relatedSkills: skills,
                            helpfulNotes: aiResponse.helpfulNotes || ""
                        }
                    )
                    return skills;
                }
            )
            // Step 4: Send the ticket to appropriate moderator
            const moderator = await step.run("assign-moderator", 
                async () => {
                    return await getAppropriateModerator(relatedSkills);
                }
            )
            // Step 5: Assign the ticket to the moderator
            await step.run("assign-ticket",
                async () => {
                    if(!moderator) {
                        throw new NonRetriableError("No appropriate moderator found for the ticket");
                    }
                    await Ticket.updateOne(
                        { _id: ticket._id },
                        { 
                            assignedTo: moderator,
                            status: "IN_PROGRESS"
                        }
                    )
                }
            )
            // Step 6: Send user email that ticket has been assigned to a moderator
            const success = await step.run("notify-user-and-moderator-ticket-assigned", 
                async () => {
                    try {
                        // Get user email from ticket
                        const ticketWithUser = await Ticket.findById(ticket._id).populate("createdBy", "email");
                        
                        // Send email to moderator
                        await sendMail(
                            moderator.email,  //to
                            "You have been assigned a new ticket",  //subject
                            `A new ticket is assigned to you, titled "${ticket.title}". 
                            
Description: ${ticket.description}

AI Notes: ${aiResponse.helpfulNotes || 'No additional notes available.'}

Priority: ${aiResponse.priority}
Required Skills: ${relatedSkills.join(', ')}` // text
                        )
                        // Send email to user
                        await sendMail(
                            ticketWithUser.createdBy.email,  //to
                            "Your ticket has been assigned to a moderator",  //subject
                            `Your ticket titled "${ticket.title}" has been assigned to a moderator for further assistance. You will be notified once there are updates.` // text
                        )
                        return { success: true };
                    } catch (error) {
                        throw new NonRetriableError("Failed to send email to user or moderator: " + error.message);
                    }
                }
            ) 
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
)