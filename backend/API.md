# Task Management API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Auth Routes

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response:
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Task Routes

#### Create Task
```
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task management application",
  "priority": "high",
  "dueDate": "2024-12-31"
}

Response:
{
  "message": "Task created successfully",
  "task": {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the task management application",
    "status": "todo",
    "priority": "high",
    "dueDate": "2024-12-31",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get All Tasks
```
GET /tasks
Authorization: Bearer <token>

Response:
[
  {
    "_id": "task_id",
    "title": "Complete project",
    "status": "todo",
    "priority": "high",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Single Task
```
GET /tasks/:id
Authorization: Bearer <token>
```

#### Update Task
```
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "in-progress",
  "priority": "medium"
}
```

#### Delete Task
```
DELETE /tasks/:id
Authorization: Bearer <token>
```

### User Routes

#### Get User Profile
```
GET /users/profile
Authorization: Bearer <token>
```

#### Update User Profile
```
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```
