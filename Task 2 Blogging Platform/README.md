# Blogwave - Full Stack Blogging Platform

**Blogwave** is a full stack blogging platform that allows users to create, edit, delete, and comment on blog posts. It includes user authentication and role-based features, built using the MERN stack (MongoDB, Express, React/HTML+JS, Node.js).

---

## 📁 Project Structure

```
Task 2 Blogging Platform/
├── backend/               # Node.js + Express backend API
│   ├── controllers/       # Controller logic for users and blogs
│   ├── models/            # Mongoose schemas for MongoDB
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middleware (auth, error handler)
│   ├── utils/             # Helper functions (e.g., JWT token)
│   ├── .env               # Environment variables (ignored in version control)
│   └── server.js          # Entry point for backend server
│
├── frontend/              # Frontend with HTML, Tailwind CSS, and JavaScript
│   ├── index.html         # Main UI
│   ├── script.js          # Frontend logic with API calls
│   ├── styles/            # Optional custom styles
│   └── images/            # Optional static assets
│
└── README.md              # Project documentation
```

---

## 🚀 Features

### ✅ Frontend
- Built with HTML, Tailwind CSS, and JavaScript
- Responsive design with clean layout
- Login and Signup modals
- View, create, edit, and delete blog posts
- Comment on posts dynamically

### ✅ Backend
- Built using Node.js, Express, and MongoDB
- RESTful API for all blog and user operations
- User authentication using JWT tokens
- Protected routes for authorized users
- Commenting system
- CRUD operations for blog posts

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
# Clone the full repository from GitHub
git clone https://github.com/Vaibhav-078/Brainwave_Matrix_Intern.git

# Navigate into the specific project directory
cd "Brainwave_Matrix_Intern/Task 2 Blogging Platform

### 2. Setup Backend

```bash
cd backend
npm install
# Create a .env file based on .env.example
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
# Open index.html in browser or use Live Server
npx live-server
```

---

## 🗂 Environment Variables

Backend requires a `.env` file with the following:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ The `.env` file is ignored by version control.

---

## 📌 Notes

- Make sure MongoDB is running locally or use MongoDB Atlas.
- CORS must be enabled in backend for cross-origin requests.
- Tailwind CSS can be configured further as per design needs.

---

## 🧑‍💻 Author

**Vaibhav Chouhan**  
Project Title: **Task 2 - Blogging Platform**  
Technologies Used: **HTML, Tailwind CSS, JavaScript, Node.js, Express, MongoDB**
