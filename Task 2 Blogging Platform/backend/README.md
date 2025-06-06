# 📝 Blogging Platform

A simple and extensible blogging platform built with **Node.js**, **Express**, and **MongoDB**. It allows users to register, create posts, and manage comments.

## 📁 Project Structure

```
backend/
├── config/              # Database connection
├── controllers/         # Route controllers for posts and users
├── middlewares/         # Authentication and async handling middleware
├── models/              # Mongoose models for User, Post, Comment
├── routes/              # API route handlers (if exists)
├── server.js            # Main server file
```

## 🚀 Features

- User registration and login (JWT-based)
- Post creation, retrieval, update, and deletion
- Comment system for posts
- Middleware-based authentication
- MongoDB integration

## 📦 Installation

```bash
cd backend
npm install
```

## ⚙️ Configuration

Create a `.env` file inside the `backend/` directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

> ⚠️ Do **not** commit the `.env` file. It is ignored via `.gitignore`.

## ▶️ Run the Server

```bash
npm run dev
```

The server will run at `http://localhost:5000`.

## 📬 API Endpoints (Basic)

- `POST /api/users/register` – Register a new user
- `POST /api/users/login` – Login
- `GET /api/posts` – List all posts
- `POST /api/posts` – Create a new post
- `PUT /api/posts/:id` – Edit a post
- `DELETE /api/posts/:id` – Delete a post

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication