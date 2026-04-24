# 🚀 FreelanceHub — Full Stack Web Application

A full-stack freelance marketplace inspired by Fiverr/Upwork, built with **HTML, CSS, JavaScript** on the frontend and **Node.js + Express.js** on the backend.

Author : Mahwish

---

## 📋 Project Description

FreelanceHub allows users to browse freelance services (gigs), view detailed information, save favourites, and hire services — all powered by a RESTful API backend.

---

## ✨ Features

### Frontend
- 🏠 Home Page with hero section and category browsing
- 📋 Services Listing with live search, filter, and sort
- 👁 Service Detail View via modal popup
- 📊 User Dashboard showing saved and hired services
- 🖱️ Drag and Drop to save/hire services
- 📱 Fully responsive mobile-first design

### Backend
- RESTful API with 7+ endpoints
- In-memory data storage
- Request validation and proper HTTP status codes
- Global error handling middleware

---

## 📁 Project Structure

```
FreelanceHub-FullStack/
│
├── client/                  ← Frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
├── server/                  ← Backend (Express.js)
│   ├── server.js            ← Main server entry point
│   ├── routes/
│   │   └── serviceRoutes.js ← API route definitions
│   ├── controllers/
│   │   └── servicesController.js ← Business logic
│   └── data/
│       └── services.js      ← In-memory data store
│
├── package.json
└── README.md
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | Get all services (supports search, filter, sort) |
| GET | `/api/services/:id` | Get a single service by ID |
| POST | `/api/services` | Add a new service *(bonus)* |
| POST | `/api/save` | Save a service |
| POST | `/api/hire` | Hire a service |
| GET | `/api/saved` | Get all saved services |
| GET | `/api/hired` | Get all hired services |
| DELETE | `/api/saved/:id` | Remove from saved |

### Query Parameters for GET /api/services
| Param | Example | Description |
|-------|---------|-------------|
| search | `?search=logo` | Filter by title keyword |
| category | `?category=Design` | Filter by category |
| sort | `?sort=price_asc` | Sort: price_asc, price_desc, rating |
| maxPrice | `?maxPrice=100` | Maximum price filter |
| minRating | `?minRating=4.7` | Minimum rating filter |

---

## ⚙️ Setup Instructions

### Requirements
- Node.js (v14 or higher) — download at https://nodejs.org

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/FreelanceHub-FullStack.git
   cd FreelanceHub-FullStack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🧪 Test the API

Open these URLs in your browser after starting the server:

- http://localhost:3000/api/services
- http://localhost:3000/api/services/1
- http://localhost:3000/api/saved
- http://localhost:3000/api/hired

---

## 🛠️ Technologies Used

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Data | In-memory arrays (JavaScript) |
| API | RESTful JSON API |

---

## 👩‍💻 GitHub Commit History

- `Initial setup` — Project structure and package.json
- `Frontend` — HTML pages, CSS styling, responsive layout
- `Backend APIs` — Express server, routes, controllers, data
- `Integration` — fetch() calls connecting frontend to backend

---

*Built as part of a Full Stack Web Development assignment.*
