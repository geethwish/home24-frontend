# Back-Office Application for Product Management

## Prerequisites

- Node.js (version >= 18) and npm (or yarn/pnpm) installed.
- MongoDB installed and running or Mongo DB Atlas.

## Technologies Used

### Frontend:

- **React**: Frontend framework.
- **TypeScript**: type strick super set of javascript
- **Ant Design**: A UI library.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Vite**: A build tool and for optimize app build
- **Redux Toolkit**: A library for efficient Redux development (state management).
- **React Query**: A library for fetching, caching, and updating data in React applications.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Router**: A library for declarative routing in React applications.
- **React Toastify**: A library for displaying toast notifications.
- **Jest**: A JavaScript testing framework.
- **React Testing Library**: A library for testing React components.
- **Cypress**: An end-to-end testing framework.

### Backend:

- **Node.js**: JavaScript runtime environment.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **MongoDB**: A NoSQL database.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **bcrypt**: A library for password hashing.
- **jsonwebtoken**: A library for creating and verifying JSON Web Tokens (JWT).
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: A library for loading environment variables from a `.env` file.
- **Swagger**: A specification and toolset for describing, producing, consuming, and visualizing RESTful APIs.
- **swagger-ui-express**: Middleware to serve Swagger UI for Express apps.
- **swagger-jsdoc**: Generates Swagger specification from JSDoc comments in your code.
- **Jest**: A JavaScript testing framework.

### URLs:

- **Frontend**: [http://localhost:5173/](http://localhost:5173/) (default development URL)
- **API Docs**: [http://localhost:3001/api-docs](http://localhost:3001/api-docs) (after starting the backend)
- **API Specs**: Available in the `backend/docs/swagger.yaml` file.

## Installation

### Backend:

1. Navigate to the backend directory in your terminal.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root of the backend directory and configure the environment variables (e.g., `MONGO_URI`, `JWT_SECRET`).
4. Run `npm run dev` to start the development server.
5. Run `npm run build` to build the project for production.
6. Run `npm start` to start the production server (after building).
7. Run `npm test` to run the backend unit tests.

### Frontend:

1. Navigate to the frontend directory in your terminal.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file in the root of the frontend directory and configure the environment variables (e.g., `VITE_API_BASE_URL`).
4. Run `npm run dev` to start the development server.
5. Run `npm run build` to build the project for production (creates a `dist` folder).
6. Run `npm run test` to run the frontend unit tests.
7. Run `npm run test:coverage` to run the frontend test coverage.

## TODO Lists

### Frontend:

- Implement dynamic rendering of input fields in the attribute editor based on attribute type ("number", "text", "url", "tags", "boolean").
- Improve the UI for displaying different attribute types.
- Add more unit and E2E tests to achieve higher coverage.
- Implement better error handling for UI interactions.

## Future enhancement

### Backend:

- Implement more robust data validation using libraries like `express-validator`.
- Add detailed logging for debugging and monitoring.
- Implement proper authorization (role-based access control).
- Consider using a more advanced caching mechanism.
- Implement soft delete for categories and products.

### Frontend:

- Improve the UI/UX with more user-friendly forms and interactions.
