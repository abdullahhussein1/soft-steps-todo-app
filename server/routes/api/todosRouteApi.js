const Router = require("express").Router;
const pool = require("../../db");

const router = Router();

// CREATE TODO
router.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos(description) VALUES($1) RETURNING *",
      [description]
    );

    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// GET ALL TODOS
router.get("/", async (req, res) => {
  const todos = await pool.query("SELECT * FROM todos ORDER BY todo_id");
  res.json(todos.rows);
});

// GET SINGLE TODO
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// UPDATE TODO
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, pinned, completed } = req.body;

    if (description === undefined && completed===undefined && pinned !==undefined) {
      await pool.query(
        "UPDATE todos SET  pinned = $1 WHERE todo_id = $2 RETURNING *",
        [pinned, id]
      );
      res.json({ msg: "pinned updated" });
    } else if (pinned === undefined && completed===undefined && description !==undefined) {
      await pool.query(
        "UPDATE todos SET  description = $1 WHERE todo_id = $2 RETURNING *",
        [description, id]
      );
      res.json({ msg: "description updated" });
    } else if (pinned === undefined && description === undefined && completed !==undefined) {
      await pool.query(
        "UPDATE todos SET completed = $1, pinned=false WHERE todo_id = $2 RETURNING *",
        [completed, id]
      );
      res.json({ msg: "description updated" });
    }
  } catch (err) {
    console.error(err);
  }
});

// DELETE TODO
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 RETURNING *",
      [id]
    );

    res.json(deletedTodo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
