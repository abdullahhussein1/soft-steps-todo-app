import express from "express";
import cors from "cors";
import stepsRoute from "./routes/api/stepsRouteApi";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/steps", stepsRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`➜  Local:   \x1b[36mhttp://localhost:${PORT}/\x1b[0m`);
});
