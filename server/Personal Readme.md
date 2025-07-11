# Full Stack AI Agent: AI Ticket Generator

## User Logged In
### Roles: Admin, Moderator, User
- Admin: Handles Moderator: Add, Edit(Name, Skills), Delete
- Moderator: Does the task[Solves user query(ticket)] assigned to it
- User: Sends its query(ticket)

## Working
- User -> AI Agent: User generates its ticket(problem it gets): Title Description
- AI Agent -> LLM: AI Agent Sends it to LLM(Gemini)
- LLM(Gemini) -> AI Agent: Gemini creates Metadata(like Skills Required, Priority, Helpful Notes, Categorize) adn sends it back to AI Agent
- Task will be accordingly send to Moderator(with that skill set)

- Moderator could see all the task(tickets) assigned to it, with important data



## Database
- User
- Ticket

## Other Important Thing
- Sending mail: Using NodeMailer




<!-- What I did
0. .env SetUp
1. Models/user,ticket 
2. Server: Start Express Server and connect it with backend
3. Utils/mail.js: Created the NodeMailer thing
4. inngest/client.js
    - inngest/functions/onSignup
5. Controllers/user.js: functions->signup, login, logout, updateUser, getUser
6. Middleware/auth.js
7. Routes/userRoutes.js:
         /ticketRoutes.js 
8. Implement the Routes in @/server.js,  Note: here @: root directory
9. utils/aiAgent.js: Create the AI Agent using @inngest/agent-kit, create MetaData first
10. inngest/functions/onTicketCreate: Write the flow and connect it to aiAgent  
11. controllers/ticket.js
12. @/server.js: import and add all routes, and also ingest(client and all functions in server.js)
13. Add 1 thing package.json, to run inngest server:
    package.json:
    ...
    "scripts": {
        ...,
        "inngest-dev": "npx inngest-cli@latest dev"
    }
 -->



# Improvements to do:
- It doesn't handle Load balancing, Some moderator could get too many task, and some very less or none