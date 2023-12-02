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
    const { description, pinned } = req.body;

    if (description === undefined) {
      await pool.query(
        "UPDATE todos SET  pinned = $1 WHERE todo_id = $2 RETURNING *",
        [pinned, id]
      );
      res.json({ msg: "pinned updated" });
    } else if (pinned === undefined) {
      await pool.query(
        "UPDATE todos SET  description = $1 WHERE todo_id = $2 RETURNING *",
        [description, id]
      );
      res.json({ msg: "description updated" });
    } else {
      await pool.query(
        "UPDATE todos SET description = $1, pinned = $2 WHERE todo_id = $3 RETURNING *",
        [description, pinned, id]
      );
      res.json({ msg: "Todo updated" });
    }
  } catch (err) {
    console.error(err);
  }
});

// DELETE TODO
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM todos WHERE todo_id = $1", [id]);

    res.json({ msg: "Todo Deleted ^-^" });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
