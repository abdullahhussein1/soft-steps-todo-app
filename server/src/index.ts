import express from "express";
import cors from "cors";
import todosRoute from "./routes/api/todosRouteApi";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/todos", todosRoute);
app.use(cors());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
