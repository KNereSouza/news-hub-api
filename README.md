# NewsHub API

NewsHub API is a backend service for managing a complete news management system. It provides endpoints for user authentication, role-based access control, and news-related operations.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [Creating an Admin User](#creating-an-admin-user)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication with JWT.
- Role-based access control (Admin, Editor, Author).
- Secure password storage using bcrypt.
- Modular and scalable code structure.
- PostgreSQL database integration with Sequelize ORM.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for creating RESTful APIs.
- **Sequelize**: ORM for database management.
- **PostgreSQL**: Relational database for data storage.
- **JWT**: JSON Web Tokens for secure authentication.
- **bcrypt**: For hashing passwords.
- **dotenv**: For managing environment variables.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KNereSouza/news-hub-api.git
   cd news-hub-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   - Create a PostgreSQL database (e.g., `news-hub`).
   - Update the `.env` file with your database credentials.

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=3000
DB_NAME=news-hub
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
JWT_SECRET=your_secret_key
```

Replace `your_db_user`, `your_db_password`, and `your_secret_key` with your actual values.

---

## Usage

### Running the Server

Start the development server:

```bash
npm run dev
```

The server will be running at: [http://localhost:3000](http://localhost:3000)

---

### Creating an Admin User

To manage the system, you need at least one user with the **admin** role.  
Since the `/users` route is protected and does not allow creating admin users via API, you must create the admin user directly in the database.

#### 1. Generate a bcrypt password hash

In a Node.js REPL or script, run:

```js
const bcrypt = require("bcryptjs");
bcrypt.hash("your_admin_password", 10).then(console.log);
```

Copy the resulting hash.

#### 2. Insert the admin user into the database

Run the following SQL in your PostgreSQL database (replace values as needed):

```sql
INSERT INTO "Users" (id, "firstName", "lastName", bio, email, password, role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'System',
  'Admin',
  'NewsHub Administrator',
  'admin@example.com',
  '<bcrypt_hashed_password>',
  'admin',
  NOW(),
  NOW()
);
```

Replace `<bcrypt_hashed_password>` with the hash you generated.

---

After this, you can log in via `/auth/login` using the admin credentials to obtain a JWT token and access protected routes.

---

### API Endpoints

This project is currently in development. Some features may not be fully implemented or stable.

#### Root

- **GET** `/`
  - Retrieve a welcome message to verify the server is running.

---

#### Auth Routes

- **POST** `/auth/login`

  - Authenticate a user and return a JWT token.

  **Request body:**

  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```

  **Response:**

  ```json
  {
    "token": "your_jwt_token",
    "user": {
      "id": "ab9fd8aa-5e39-4e5c-a62c-f5194eb43d33",
      "email": "user@example.com",
      "role": "author"
    }
  }
  ```

---

#### Users Routes

- **POST** `/users`  
  Create a new user account (admin only).

- **GET** `/users`  
  Retrieve a list of all users.

- **GET** `/users/:id`  
  Retrieve a specific user by ID.

- **PATCH** `/users/:id`  
  Update user details by user ID (admin only).

- **DELETE** `/users/:id`  
  Delete a user by user ID (admin only).

---

#### Categories Routes

- **POST** `/categories`  
  Create a new category (admin only).

- **GET** `/categories`  
  Retrieve a list of all categories.

- **GET** `/categories/:slug`  
  Retrieve a category by slug.

- **PATCH** `/categories/:id`  
  Update category details by category ID (admin only).

- **DELETE** `/categories/:id`  
  Delete a category by category ID (admin only).

---

#### Articles Routes

- **POST** `/articles`  
  Create a new article (author only).

- **GET** `/articles`  
  Retrieve all published articles.  
  Supports optional filters via query parameters:

  - `authorId`: Filter by author ID
  - `categorySlug`: Filter by category slug

  **Examples:**

  - `/articles?authorId=123`
  - `/articles?categorySlug=politica`
  - `/articles?authorId=123&categorySlug=politica`

- **GET** `/articles/:slug`  
  Retrieve a single article by slug.

- **PATCH** `/articles/:id`  
  Update an article (only the owner, admin, or editor).

- **DELETE** `/articles/:id`  
  Delete an article (admin only).

---

### Authentication

Authentication in the NewsHub API is handled using JSON Web Tokens (JWT). Users must authenticate to access protected routes.

#### Login

To authenticate, use the following endpoint:

- **POST** `/auth/login`

  Request body:

  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```

  Response:

  ```json
  {
    "token": "your_jwt_token",
    "user": {
      "id": "ab9fd8aa-5e39-4e5c-a62c-f5194eb43d33",
      "email": "user@example.com",
      "role": "author"
    }
  }
  ```

#### Protected Routes

To access protected routes, include the token in the `Authorization` header:

```
Authorization: Bearer your_jwt_token
```

If the token is invalid or expired, the server will respond with an appropriate error message.

---

## Project Structure

```
news-hub-api/
├── src/
│   ├── config/             # Database configuration
│   ├── controllers/        # API controllers
│   ├── middlewares/        # Authentication and role-based middlewares
│   ├── models/             # Sequelize models
│   ├── repositories/       # Database interaction logic
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── index.js            # Entry point of the application
├── .env                    # Environment variables
├── .gitignore              # Files to ignore in Git
├── package.json            # Project metadata and dependencies
├── LICENSE                 # License file
└── README.md               # Project documentation
```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `feature/your-feature-name`.
3. Commit your changes: `git commit -m "feat: add your feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software under the terms of the license.

For more details, see the [LICENSE](./LICENSE) file.
