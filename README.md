# AI Ticket Assistance 🎫

> A smart ticket management system that uses AI to automatically assign support tickets to the right moderators based on their skills.

## What it does 💡

Users create tickets → AI analyzes them → Assigns to moderators with matching skills → Problem gets solved faster!

### The Flow:
1. **User** submits a ticket (title + description)
2. **AI Agent** sends it to **Google Gemini** for analysis
3. **Gemini** returns metadata: required skills, priority, helpful notes
4. **System** finds the best moderator with matching skills
5. **Moderator** gets assigned the ticket with AI-generated notes to help solve it

## Tech Stack 🛠️

**Frontend:** React + Vite  
**Backend:** Node.js + Express  
**Database:** MongoDB  
**AI:** Google Gemini API  
**Background Jobs:** Inngest  
**Emails:** NodeMailer + Mailtrap  

## User Roles 👥

- **User**: Creates tickets, tracks their status
- **Moderator**: Solves tickets assigned to them based on skills
- **Admin**: Manages moderators (add, edit skills, delete)

## Key Features ✨

- 🤖 **AI-powered ticket analysis** using Google Gemini
- 🎯 **Smart assignment** based on moderator skills
- 📧 **Automatic email notifications** 
- 🔄 **Background processing** with Inngest
- 🔐 **Role-based authentication** with JWT
- 📱 **Responsive React frontend**

## Getting Started 🚀

### Prerequisites
- Node.js
- MongoDB
- Google Gemini API key
- Mailtrap account

### Setup

1. **Clone the repo**
```bash
git clone https://github.com/AyazManiar/AI-Ticket-Assistance.git
cd AI-Ticket-Assistance
```

2. **Backend setup**
```bash
cd server
npm install
cp .env.example .env
# Fill in your .env variables
npm run dev
```

3. **Start Inngest** (new terminal)
```bash
cd server
npm run inngest-dev
```

4. **Frontend setup** (new terminal)
```bash
cd client
npm install
npm run dev
```

## Environment Variables 🔧

```env
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=your_secret_key
MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_user
MAILTRAP_SMTP_PASS=your_pass
GEMINI_API_KEY=your_gemini_key
```

## How the AI Works 🧠

The system uses Google Gemini to analyze ticket content and extract:
- **Required skills** (JavaScript, React, Python, etc.)
- **Priority level** (Low/Medium/High)
- **Helpful notes** for moderators
- **Summary** of the issue

Then it matches tickets to moderators based on their skill sets!

## Database Models 📊

**User:**
```javascript
{
  email: String,
  password: String (hashed),
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

## Current Status ⏳

✅ User authentication & authorization  
✅ Ticket creation and listing  
✅ AI analysis with Gemini  
✅ Smart moderator assignment  
✅ Email notifications  
✅ Background job processing  

🚧 **Work in Progress:**
- Admin panel for user management
- Individual ticket detail pages
- Load balancing for moderator assignments

## Improvements to do 📈

- Better load balancing (some moderators might get too many tickets)
- Enhanced error handling
- Ticket filtering and search
- Real-time updates
- Performance optimizations

---

Built with ❤️ by [Ayaz Maniar](https://linkedin.com/in/ayazmaniar)

### Backend
- **Node.js + Express** - Server runtime and web framework
- **MongoDB + Mongoose** - Database and ODM
- **JWT + bcrypt** - Authentication and security
- **Inngest** - Background job processing

### AI & Integration
- **Google Gemini 1.5 Flash** - AI ticket analysis
- **Nodemailer + Mailtrap** - Email notifications
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **Google Gemini API key**
- **Mailtrap account** (for email testing)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/AyazManiar/AI-Ticket-Assistance.git
cd AI-Ticket-Assistance
```

### 2. Backend Setup
```bash
cd server
npm install

# Create .env file with your configuration
cp .env.example .env
# Edit .env with your credentials

# Start the server
npm run dev

# In a separate terminal, start Inngest
npm run inngest-dev
```

### 3. Frontend Setup
```bash
cd client
npm install

# Start the development server
npm run dev
```

### 4. Environment Variables

Create a `.env` file in the server directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/aiticketassistance

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Email Configuration (Mailtrap)
MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_mailtrap_user
MAILTRAP_SMTP_PASS=your_mailtrap_password

# AI Integration
GEMINI_API_KEY=your_google_gemini_api_key
```

## 📝 API Documentation

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login and get JWT token | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |

### Ticket Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/tickets/create-ticket` | Create a new ticket | ✅ |
| GET | `/api/tickets/get-tickets` | Get tickets (filtered by role) | ✅ |
| GET | `/api/tickets/get-ticket/:id` | Get specific ticket details | ✅ |

### User Management (Admin Only)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/auth/user` | Get user details | ✅ (Admin) |
| PUT | `/api/auth/update-user` | Update user role & skills | ✅ (Admin) |

## 🔄 Complete Ticket Processing Flow

### 1. **Ticket Creation**
```
User submits ticket → System creates record → Triggers AI processing
```

### 2. **AI Analysis Phase**
```
Inngest event: "ticket/created"
    ↓
Google Gemini analyzes content
    ↓
Generates: Skills, Priority, Notes, Category
```

### 3. **Smart Assignment**
```
Skill matching algorithm
    ↓
Find best moderator match
    ↓
Fallback to admin if needed
    ↓
Update ticket assignment
```

### 4. **Notification System**
```
Email to assigned moderator
    ↓
Include ticket details + AI notes
    ↓
User notification of assignment
```

## 🗂️ Project Structure

```
AI-Ticket-Assistance/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── styles/         # CSS files
├── server/                 # Node.js backend
│   ├── controllers/        # Route handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   └── inngest/            # Background jobs
└── README.md
```

## 👥 User Roles

### 🙋‍♂️ **User (Default)**
- Create and track support tickets
- View personal ticket history
- Receive status updates

### 🛠️ **Moderator**
- View assigned tickets
- Access AI-generated resolution notes
- Update ticket status
- Resolve user issues

### 👑 **Admin**
- Manage user roles and permissions
- View system-wide analytics
- Moderate all tickets
- Configure moderator skills

## 🤖 AI Integration Details

### **Google Gemini Configuration**
- **Model**: Gemini 1.5 Flash 8B
- **Purpose**: Intelligent ticket triage
- **Analysis Capabilities**:
  - Content summarization
  - Priority assessment (Low/Medium/High)
  - Technical skill identification
  - Resolution guidance generation

### **Skill Matching Algorithm**
```javascript
// Example skill matching logic
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

## 📊 Performance Features

- **Asynchronous Processing** - Non-blocking ticket analysis
- **Event-Driven Architecture** - Scalable background jobs
- **Intelligent Caching** - Optimized database queries
- **Real-time Updates** - Live status notifications

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt encryption
- **Input Validation** - Comprehensive data sanitization
- **Role-Based Access** - Granular permission control
- **CORS Protection** - Cross-origin security

## 🚀 Deployment

### Production Environment Variables
```env
NODE_ENV=production
PORT=3000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
GEMINI_API_KEY=your_production_gemini_key
```

### Docker Support (Coming Soon)
```dockerfile
# Dockerfile configuration for containerized deployment
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📈 Future Enhancements

- [ ] **Advanced Analytics Dashboard**
- [ ] **Multi-language Support**
- [ ] **Real-time Chat Integration**
- [ ] **Mobile App Development**
- [ ] **Advanced AI Models**
- [ ] **Integration with Popular Tools** (Slack, Discord, etc.)

## 🐛 Known Issues & Improvements

- Load balancing for moderator assignment
- Enhanced error handling
- Performance optimization for large datasets
- Advanced ticket filtering and search

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ayaz Maniar**
- LinkedIn: [ayazmaniar](https://www.linkedin.com/in/ayazmaniar)
- GitHub: [AyazManiar](https://github.com/AyazManiar)
- Email: [your-email@example.com]

---

⭐ **Star this repository if you found it helpful!**

*Built with ❤️ and AI intelligence*
