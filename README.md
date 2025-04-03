# Back-Office Product Management Application

## Project Overview

This project is a back-office application designed to manage a product database. It allows business users to:

- Log in to the application.
- Navigate a category page, manage category details
- Navigate to product page sorting and pagination
- Navigate to product details page manage product details
- View the most recently modified product.

The application consists of:

- **Frontend**: Built with React, TypeScript, and various modern libraries.
- **Backend**: Built with Node.js, Express.js, and MongoDB.

---

## Prerequisites

- **Node.js** (version >= 18) and npm (or yarn/pnpm) installed.
- **MongoDB** installed and running or use mongodb atlas.

---

## Technologies Used

### Frontend

- **React**: For building user interfaces.
- **TypeScript**: Adds static typing to JavaScript.
- **Ant Design**: Pre-built UI components.
- **Tailwind CSS**: Utility-first CSS framework.
- **Vite**: Fast build tool for development.
- **Redux Toolkit**: State management.
- **React Query**: Data fetching and caching.
- **Axios**: HTTP client for API requests.
- **React Router**: Declarative routing.
- **React Toastify**: Toast notifications.
- **Jest**: Unit testing framework.
- **React Testing Library**: Testing React components.

### Backend

- **Node.js**: JavaScript runtime.
- **Express.js**: Web application framework.
- **TypeScript**: Adds static typing to JavaScript.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM library for MongoDB.
- **bcrypt**: Password hashing.
- **jsonwebtoken**: JSON Web Token (JWT) for authentication.
- **cors**: Cross-Origin Resource Sharing middleware.
- **dotenv**: Environment variable management.
- **Swagger**: API documentation.
- **Jest**: Unit testing framework.

---

## Installation

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the backend directory and configure the following variables:
   ```
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build the project for production:
   ```bash
   npm run build
   ```
6. Start the production server:
   ```bash
   npm start
   ```
7. Run backend unit tests:
   ```bash
   npm test
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root of the frontend directory and configure the following variable:
   ```
   VITE_API_BASE_URL=http://localhost:3001
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build the project for production:
   ```bash
   npm run build
   ```
6. Run frontend unit tests:
   ```bash
   npm run test:unit
   ```
7. Open the Cypress UI for end-to-end testing:
   ```bash
   npm run cypress:open
   ```

---

## Usage

1. Start both the backend and frontend servers.
2. Open your browser and navigate to the frontend URL: [http://localhost:5173/](http://localhost:5173/).
3. **Login**: Use the login form with valid credentials.
4. **Category Navigation**: Navigate the category tree in the sidebar to view products.
5. **Product Listing**: View products in a table with pagination and sorting.
6. **Product Details**: Click on a product to view and edit its attributes.
7. **Last Modified Product**: View the most recently modified product in the widget.
8. **Logout**: Use the "Logout" button to exit the application.

---

## Features

### Components

- **Login Form**: Validates user credentials.
- **Category Tree**: Displays hierarchical categories on the sidebar.
- **Product Table**: Lists products with sorting and pagination.
- **Category Table**: Lists Category with sorting and pagination.
- **Product Details Page**: Allows viewing and editing product details and delete.
- **Last Modified Product Widget**: Displays the most recently modified product.
- **Recently Added Product Widget**: Displays the most recently added product.
- **All Products count Widget**: Displays total product count.
- **All Category count Widget**: Displays total category count.
- **Private Route**: This app is secured app user's can not login without valid credentials if user's try to access Dashboard or other pages it will re-direct to login page

### Techniques

- **Redux toolkit**: Global store for share common details like user details and theme settings
- **Rect query**: cashing products and categories using react-query library
- **Jest testing**: Maintain the bug free, highly maintainable code

### Backend Features

- **Authentication**: JWT-based login and route protection.
- **Category Management**: CRUD operations for categories.
- **Product Management**: CRUD operations for products.
- **API Documentation**: Swagger-based API documentation.

---

## Validation Error Messages

- **Login Form**:
  - "Please input your email!"
  - "Please input your password!"
  - "Invalid credentials" (from backend).

---

## API Documentation

- Access Swagger UI at: [http://localhost:3001/api-docs](http://localhost:3001/api-docs).
- API specs are available in `backend/docs/swagger.yaml`.

---

## Quality and Testing

- Unit tests for both frontend and backend.
- Responsive design using Tailwind CSS.

---
