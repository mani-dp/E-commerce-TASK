# E-commerce Backend

A  e-commerce bRESTfulackend built with Express.js, Prisma, and SQLite.

The project provides authentication, role-based authorization, category and product management, favorites, and image upload functionality.

# Admin pass & email

- admin@gmail.com,
- password :mwwm1234,

## Technologies

- Node.js
- Express.js
- Prisma ORM
- SQLite
- JWT
- bcrypt
- Multer
- express-validator
- dotenv
- nodemon

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Role-based authorization
- USER and ADMIN roles
- Category management
- Product management
- Product image upload
- Multiple images for users
- User image upload and management
- Favorite products
- Request validation
- Centralized error handling
- Static file serving for uploaded images

## folder structure

├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   ├── product.controller.js
│   │   ├── favorite.controller.js
│   │   └── user-image.controller.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   ├── product.routes.js
│   │   ├── favorite.routes.js
│   │   └── user-image.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── admin.middleware.js
│   │   ├── upload.middleware.js
│   │   ├── user-upload.middleware.js
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── category.validator.js
│   │   └── product.validator.js
│   │
│   ├── utils/
│   │   ├── AppError.js
│   │   ├── prisma.js
│   │   ├── jwt.js
│   │   └── file.js
│   │
│   ├── config/
│   │   └── env.js
│   │
│   └── app.js
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── dev.db
│
├── uploads/
│   ├── products/
│   └── users/
│
├── .env
├── .env.example
├── .gitignore
├── README.md
└── index.js

## Installation

- Clone the repository:

 git clone git@github.com:mani-dp/E-commerce-TASK.git


## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-key"


## Database Setup

The project uses Prisma ORM with SQLite.

Run the database migration:

```bash
npx prisma migrate dev

## Running the Project

Start the development server:

```bash
npm run dev
