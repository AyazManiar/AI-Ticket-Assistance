# AI Ticket Assistance 🎫

> A smart ticket management system that uses AI to automatically assign support tickets to the most suitable moderators based on their skills.

---

## What It Does 💡

Users submit support tickets → AI analyzes the content → System assigns them to moderators with the right skills → Issues get resolved faster and more efficiently.

---

## Tech Stack 🛠️

* **Frontend:** React + Vite
* **Backend:** Node.js + Express
* **Database:** MongoDB
* **AI:** Google Gemini API
* **Background Jobs:** Inngest
* **Email Service:** Nodemailer + Mailtrap

---

## Key Features ✨

### 🔐 Authentication & Authorization

* ✅ Secure user authentication
* 🔐 Role-based access control using JWT

### 📝 Ticket Management

* 📝 Create and view support tickets
* 🎯 Smart assignment to moderators based on required skills

### 🤖 Automation & AI

* 🤖 AI-powered ticket analysis using Google Gemini
* 🔄 Event-driven background processing with Inngest

### 📬 Notifications

* 📧 Automatic email notifications to users and moderators

---

## User Roles 👥

### 🙋‍♂️ User

* Submit and track personal support tickets
* Receive status updates via email

### 🛠️ Moderator

* View and resolve assigned tickets
* Access AI-generated notes for faster resolution

### 👑 Admin

* Manage user roles and skills
* Full visibility and control over all tickets

---

## Getting Started 🚀

### 📋 Prerequisites

Make sure the following are set up:

* Node.js (v14+)
* MongoDB (local or cloud)
* Google Gemini API key
* Mailtrap account for email testing

---

## AI Integration 🧠

The system uses **Google Gemini** to automatically analyze incoming ticket content and extract:

* 🔧 **Required technical skills** (e.g., JavaScript, React, Python)
* 🚦 **Priority level** (Low / Medium / High)
* 🧾 **Helpful notes** for moderators
* 📝 **Summary** of the issue

This metadata is used to intelligently route tickets to moderators whose skills best match the ticket requirements.

---

## 🎯 Skill Matching Algorithm

The following algorithm ensures tickets are assigned to the most qualified moderator:

```js
const findBestModerator = (requiredSkills) => {
  return moderators.reduce((best, current) => {
    const matchCount = requiredSkills.filter(skill => 
      current.skills.includes(skill)
    ).length;
    return matchCount > best.matches ? 
      { moderator: current, matches: matchCount } : best;
  }, { moderator: null, matches: 0 });
};
```

> If no suitable moderator is found, the system assigns the ticket to an admin as a fallback.

---

## Ticket Lifecycle 🔄

### 1. **Creation**

* User submits a ticket via the frontend
* Ticket is saved in the database
* Triggers background job via Inngest

### 2. **AI Analysis**

* Google Gemini analyzes the ticket description
* Extracts metadata: required skills, priority, summary, helpful notes

### 3. **Assignment**

* Skill matching algorithm runs
* Assigns ticket to the best-fit moderator
* If no match, assigns to an admin

### 4. **Notification**

* Moderator receives an email with ticket details and AI notes
* User is notified of the assignment and ticket status

---

## Database Models 📊

### 👤 User

```js
{
  email: String,
  password: String (hashed),
  role: "user" | "moderator" | "admin",
  skills: [String],
  createdAt: Date
}
```

### 🎫 Ticket

```js
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

## API Documentation 📡

### 🔐 Authentication

| Method | Endpoint           | Description       | Auth Required |
| ------ | ------------------ | ----------------- | ------------- |
| POST   | `/api/auth/signup` | Register new user | ❌             |
| POST   | `/api/auth/login`  | Login & get JWT   | ❌             |
| POST   | `/api/auth/logout` | Logout user       | ✅             |

### 📝 Ticket Management

| Method | Endpoint                      | Description               | Auth Required |
| ------ | ----------------------------- | ------------------------- | ------------- |
| POST   | `/api/tickets/create-ticket`  | Create a new ticket       | ✅             |
| GET    | `/api/tickets/get-tickets`    | Get tickets by role       | ✅             |
| GET    | `/api/tickets/get-ticket/:id` | Get single ticket details | ✅             |

### 👑 Admin Management

| Method | Endpoint                | Description               | Auth Required |
| ------ | ----------------------- | ------------------------- | ------------- |
| GET    | `/api/auth/user`        | Fetch user info           | ✅ (Admin)     |
| PUT    | `/api/auth/update-user` | Update user role & skills | ✅ (Admin)     |

---

## 📊 Performance Features

* ⚙️ Asynchronous processing with Inngest
* ⚡ Scalable event-driven architecture
* 🔔 Real-time email updates to users & moderators

---

## 🔒 Security Features

* 🛡️ JWT-based authentication
* 🔑 Passwords hashed using bcrypt
* 🧼 Input validation & sanitization
* 🔐 Role-based access control
* 🌐 CORS protection

---

## 👨‍💻 Author

**Ayaz Maniar**
Built with ❤️ by [Ayaz Maniar](https://linkedin.com/in/ayazmaniar)
👉 [LinkedIn Profile](https://www.linkedin.com/in/ayazmaniar)

---

⭐ **Star this repository if you found it helpful!**
