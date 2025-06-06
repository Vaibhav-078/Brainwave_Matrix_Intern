# Blogwave Frontend

This is the frontend of the **Blogwave** project, a blogging platform built using HTML, Tailwind CSS, and JavaScript. It interfaces with a backend API for blog post creation, user authentication, and commenting features.

## 📁 Project Structure

```
frontend/
├── index.html          # Main landing page
├── script.js           # JavaScript logic for interaction and API communication
├── styles/             # Tailwind or additional custom CSS
├── images/             # Static image assets (if any)
└── README.md           # Frontend documentation
```

## 🚀 Features

- User authentication (login/signup)
- Display of blog posts
- Create, edit, delete blog posts (admin/user-specific)
- Comment system
- Dynamic rendering using Fetch API

## ⚙️ Setup Instructions

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Tailwind CSS (if needed)**
   Make sure Tailwind is built using your preferred method (CLI or CDN). If using CDN, it's already included in `index.html`.

3. **Run frontend**

   You can use any live server extension in VS Code or run:

   ```bash
   npx live-server
   ```

   Or just open `index.html` directly in a browser.

4. **Backend API**
   Ensure the backend server is running (usually at `http://localhost:5000`) for full functionality.

## ❌ Ignored Files

- `.env` (environment config) from backend is ignored and **should not** be committed to version control.

## 📌 Notes

- Make sure CORS is enabled in the backend if accessing from different ports.
- API endpoints should be updated in `script.js` if backend URL changes.

## 🧑‍💻 Author

Vaibhav Chouhan  
Project: Task 2 - Blogging Platform
