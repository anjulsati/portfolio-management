# 🚀 Dynamic Portfolio Management System

A full-stack portfolio website with a built-in CMS (Admin Panel) to dynamically manage projects.

---

## 📌 Features

* 🌐 Modern Portfolio UI (Responsive & Animated)
* 🛠️ Admin Dashboard (CMS)
* ➕ Add Projects
* ❌ Delete Projects
* 🔄 Real-time updates from database
* 📡 REST API integration
* 🗄️ MongoDB database

---

## 🏗️ Tech Stack

### Frontend

* HTML5, CSS3
* JavaScript (Vanilla)
* Responsive Design

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

---

## 📂 Project Structure

```
PORTFOLIO-MANAGEMENT/
│
├── backend/
│   ├── models/
│   │   └── Project.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── css/
│   ├── js/
│   └── assets/
│
├── admin.html
├── index.html
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/anjulsati/portfolio-management.git
cd portfolio-management
```

### 2️⃣ Backend Setup

```
cd backend
npm install
node server.js
```

### 3️⃣ Start Frontend

* Open `index.html` in browser
* Open `admin.html` for CMS

---

## 🔗 API Endpoints

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | /api/projects     | Get all projects |
| POST   | /api/projects     | Add new project  |
| DELETE | /api/projects/:id | Delete project   |

---

## 🚀 Future Improvements

* Authentication (JWT)
* Project Image Upload
* Edit/Update Projects
* Deployment (AWS / Vercel)

---

## 👨‍💻 Author

**Anjul Sati**

* MERN & Java Full Stack Developer

---

## ⭐ Show Your Support

Give a ⭐ if you like this project!

