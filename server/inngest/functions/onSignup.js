import { inngest } from "../client.js";
import User from "../../models/user.model.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mail.js";

// https://www.inngest.com/docs/features/inngest-functions
export const onSignup = inngest.createFunction(
    { id: "on-user-signup", retries: 3 },
    { event: "user/signup" },
    async ({ event, step }) => {
        try {
            const {email} = event.data;
            // Step 1: Check if user exists
            const user = await step.run("get-user-email", async () => {
                const userObject = await User.findOne({ email })
                if(!userObject) {
                    throw new NonRetriableError("User not found in the database");
                }
                return userObject;
            })
            // Step 2: Send welcome email
            await step.run("send-welcome-email", async()=>{
                const subject = "Welcome to our Application!";
                const body = `
                    Hello ${user.name},\n\nThank you for signing up! We're excited to have you on board.\n\nBest regards,\nThe Team
                `;
                await sendMail(user.email, subject, body);
            })

            return { success: true, message: "User signup processed successfully" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
)