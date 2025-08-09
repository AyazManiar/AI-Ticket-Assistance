# **AI Ticket Assistance 🎫**

A smart ticket management system that uses AI to automatically assign support tickets to the right moderators based on their skills — making problem resolution faster and more efficient.

---

## **Table of Contents**

1. [Introduction](#introduction)
2. [How It Works](#how-it-works)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Prerequisites](#prerequisites)
6. [Database Models](#database-models)
7. [API Documentation](#api-documentation)
8. [Ticket Processing Flow](#ticket-processing-flow)
9. [Security Features](#security-features)
10. [Current Status](#current-status)
11. [Author](#author)

---

## **Introduction**

**AI Ticket Assistance** streamlines support operations by analyzing incoming tickets using **Google Gemini AI**, extracting key information, and assigning them to the most suitable moderator based on their skills.
This ensures faster resolution, better workload distribution, and improved customer satisfaction.

---

## **How It Works**

1. **User** submits a ticket (title + description).
2. **AI Agent** sends it to **Google Gemini** for analysis.
3. Gemini returns:

   * Required skills (e.g., JavaScript, React, Python)
   * Priority level (Low, Medium, High)
   * Helpful notes for resolution
4. **System** matches the ticket to the best moderator based on skills.
5. **Moderator** receives the ticket with AI-generated notes.
6. **Email notifications** are sent to both user and moderator.

---

## **Features**

### 🔹 Core

* 🤖 **AI-powered ticket analysis** using Google Gemini
* 🎯 **Smart moderator assignment** based on skills
* 📧 **Automatic email notifications** via Nodemailer + Mailtrap
* 🔄 **Background job processing** with Inngest
* 🔐 **Role-based authentication** with JWT

### 🔹 Performance

* **Asynchronous processing** for non-blocking operations
* **Event-driven architecture** for scalability
* **Real-time updates** for ticket status

### 🔹 Security

* **JWT authentication** with bcrypt password hashing
* **Input validation & sanitization**
* **Role-based access control**
* **CORS protection**

---

## **Tech Stack**

**Frontend:** React + Vite
**Backend:** Node.js + Express
**Database:** MongoDB + Mongoose
**AI:** Google Gemini API
**Background Jobs:** Inngest
**Emails:** Nodemailer + Mailtrap

---

## **Prerequisites**

* Node.js
* MongoDB
* Google Gemini API key
* Mailtrap account

---

## **Database Models**

**User:**

```javascript
{
  email: String,
  password: String, // hashed
  role: "user" | "moderator" | "admin",
  skills: [String],
  createdAt: Date
}
```

**Ticket:**

```javascript
{
  title: String,
  description: String,
  status: "TODO" | "IN_PROGRESS" | "DONE",
  priority: "LOW" | "MEDIUM" | "HIGH",
  createdBy: ObjectId,
  assignedTo: ObjectId,
  relatedSkills: [String],
  helpfulNotes: String,
  createdAt: Date
}
```

---

## **API Documentation**

### Authentication

| Method | Endpoint           | Description       | Auth |
| ------ | ------------------ | ----------------- | ---- |
| POST   | `/api/auth/signup` | Register new user | ❌    |
| POST   | `/api/auth/login`  | Login and get JWT | ❌    |
| POST   | `/api/auth/logout` | Logout user       | ✅    |

### Tickets

| Method | Endpoint                      | Description                     | Auth |
| ------ | ----------------------------- | ------------------------------- | ---- |
| POST   | `/api/tickets/create-ticket`  | Create ticket                   | ✅    |
| GET    | `/api/tickets/get-tickets`    | List tickets (filtered by role) | ✅    |
| GET    | `/api/tickets/get-ticket/:id` | Get ticket details              | ✅    |

### Admin (User Management)

| Method | Endpoint                | Description          | Auth      |
| ------ | ----------------------- | -------------------- | --------- |
| GET    | `/api/auth/user`        | Get user details     | ✅ (Admin) |
| PUT    | `/api/auth/update-user` | Update role & skills | ✅ (Admin) |

---

## **Ticket Processing Flow**

```
1. Ticket Creation
   - User submits ticket → Record created → AI processing triggered

2. AI Analysis
   - Inngest event: "ticket/created"
   - Google Gemini analyzes → Skills, Priority, Notes

3. Smart Assignment
   - Match skills → Assign moderator → Fallback to admin if needed

4. Notifications
   - Email to assigned moderator (with AI notes)
   - Notify user of assignment
```

---

## **Security Features**

* JWT-based authentication
* Bcrypt password hashing
* Input validation & sanitization
* Role-based access control
* CORS configuration

---

## **Current Status**

✅ Authentication & authorization
✅ Ticket creation & listing
✅ AI analysis & assignment
✅ Email notifications
✅ Background job processing

---

## **Author**

Built with ❤️ by [Ayaz Maniar](https://linkedin.com/in/ayazmaniar)

