const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/todos", require("./routes/api/todosRouteApi"));

// Hosting
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});
