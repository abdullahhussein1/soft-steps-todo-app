import express from "express";
import todosRoute from "./routes/api/todosRouteApi"; // Adjust the path based on your project structure

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/todos", todosRoute); // Mount the todosRoute under '/api/todos'

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
