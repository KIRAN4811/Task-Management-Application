# Task Management Application

A full-stack web application for creating, updating, and tracking tasks with real-time updates, user authentication, and responsive design.

## Features

- ✅ User authentication & authorization (JWT)
- ✅ CRUD operations for tasks
- ✅ Real-time updates using WebSockets
- ✅ Responsive design for web and mobile
- ✅ Task status tracking
- ✅ User-friendly dashboard

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS
- Axios for API calls
- Socket.io-client for real-time updates

### Backend
- Node.js with Express
- MongoDB
- JWT for authentication
- Socket.io for WebSockets
- bcrypt for password hashing

## Project Structure

```
task-management-app/
├── frontend/          # React application
├── backend/           # Express server
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Documentation

See `backend/API.md` for detailed API endpoints.

## Contributing

Contributions are welcome! Please create a feature branch and submit a pull request.

## License

MIT
