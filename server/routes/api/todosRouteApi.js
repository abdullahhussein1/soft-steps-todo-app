const Router = require("express").Router;
const pool = require("../../db");

const router = Router();

// CREATE TODO
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(title) VALUES($1) RETURNING *",
      [title]
    );

    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// GET ALL TODOS
router.get("/", async (req, res) => {
  const todos = await pool.query("SELECT * FROM todo ORDER BY id");
  res.json(todos.rows);
});

// GET SINGLE TODO
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      note,
      pinned,
      completed,
      remind_date,
      updated_at,
      deleted_at,
    } = req.body;

    const filteredUpdates = Object.fromEntries(
      Object.entries({
        title,
        note,
        pinned,
        completed,
        remind_date,
        updated_at,
        deleted_at,
      }).filter(
        ([key, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    // Generate the SET clause for the SQL query
    const setClause = Object.keys(filteredUpdates).map((key, index) => {
      return `${key} = $${index + 1}`;
    });

    const updateQuery = {
      text: `UPDATE todo SET ${setClause.join(",")} WHERE id = $${
        Object.keys(filteredUpdates).length + 1
      } RETURNING *`,
      values: [...Object.values(filteredUpdates), id],
    };

    const result = await pool.query(updateQuery);

    // Determine which fields were updated
    const updatedFields = Object.keys(filteredUpdates);

    res.json({
      msg: `${updatedFields.join(", ")} updated`,
      result: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE TODO
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await pool.query(
      "DELETE FROM todo WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(deletedTodo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
