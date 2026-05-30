# Setup Instructions

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-management
   JWT_SECRET=your_super_secret_jwt_key_change_this
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Running the Application

1. Start MongoDB:
   ```bash
   mongod
   ```

2. In a new terminal, start the backend:
   ```bash
   cd backend
   npm run dev
   ```

3. In another terminal, start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173`

## Features

### Authentication
- User registration
- User login
- JWT token-based authentication

### Task Management
- Create tasks
- View all tasks
- Update task status (To Do, In Progress, Completed)
- Edit task details
- Delete tasks
- Filter tasks by status
- Task priority levels (Low, Medium, High)
- Due date assignment

### Real-time Updates
- WebSocket connection for real-time task updates
- Task creation notifications
- Task update notifications
- Task deletion notifications

## Project Structure

```
task-management-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── tasks.js
│   │   │   └── users.js
│   │   └── index.js
│   ├── .env.example
│   ├── package.json
│   └── API.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── TaskForm.css
│   │   │   ├── TaskList.css
│   │   │   └── TaskCard.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   └── package.json
├── README.md
├── SETUP.md
└── .gitignore
```

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your MONGODB_URI in `.env`

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Change port in `vite.config.js`

### Socket.io Connection Issues
- Ensure CORS is properly configured in backend
- Check CLIENT_URL in backend `.env`

## API Endpoints

See `backend/API.md` for detailed API documentation.
