const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");

// Initialize Superbase client
const supabaseUrl = "https://segqjlhodxcykvbdnqfd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlZ3FqbGhvZHhjeWt2YmRucWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzNzcxMzcsImV4cCI6MjAyMTk1MzEzN30.LdpvQ9vD2JbPOK8h0Pjw5Z3ll3d4_c7Or_FNlNaNYEE";

const supabase = createClient(supabaseUrl, supabaseKey);

const router = Router();

// CREATE TODO
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      task,
      note,
      priority,
      location,
      attachment,
      is_complete,
      is_pin,
      remind_at,
    } = req.body;
    const { data: newTodo, error } = await supabase
      .from("todos")
      .upsert({
        user_id,
        task,
        note,
        priority,
        location,
        attachment,
        is_complete,
        is_pin,
        remind_at,
      })
      .select();

    if (error) {
      throw error;
    }

    res.status(201).json(newTodo[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL TODOS
router.get("/", async (req, res) => {
  try {
    const { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    if (todos !== null) {
      res.json(todos);
    } else {
      res.json([]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET SINGLE TODO
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data: todo, error } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE TODO
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      task,
      note,
      priority,
      location,
      attachment,
      is_complete,
      is_pin,
      remind_at,
      updated_at,
      deleted_at,
    } = req.body;

    const { data: updatedTodo, error } = await supabase
      .from("todos")
      .upsert([
        {
          id,
          task,
          note,
          priority,
          location,
          attachment,
          is_complete,
          is_pin,
          remind_at,
          updated_at,
          deleted_at,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    res.json(updatedTodo[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE TODO
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data: deletedTodo, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    res.json(deletedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
