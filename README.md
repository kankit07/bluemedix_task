# User Management API

A RESTful API for user management with authentication and role-based access control.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control (Admin, Seller, Customer)
- CRUD operations for users
- Password hashing with bcrypt
- Input validation

## Tech Stack

- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt.js for password hashing
- Express Validator for input validation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies
```
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=24h
```
4. Start the server
```
node server.js
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile (protected)

### User Management (Admin only)

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Role-Based Access Control

The API implements role-based access control with three roles:

- **Admin**: Has access to all user management endpoints
- **Seller**: Limited access (customizable as needed)
- **Customer**: Limited access (customizable as needed)

## API Usage Examples

### Register a User

```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "isSeller": true,
  "isCustomer": true
}
```

### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

### Get Current User

```
GET /api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

### Get All Users (Admin only)

```
GET /api/users
Authorization: Bearer ADMIN_JWT_TOKEN
```

make admin using
- `/api/auth/register` - Register admin
provide isAdmin:true

then can create, update, and delete users using
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
