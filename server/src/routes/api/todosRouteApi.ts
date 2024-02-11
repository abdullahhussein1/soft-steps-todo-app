import { Router, Request, Response } from "express";
import { createClient, PostgrestResponse } from "@supabase/supabase-js";
import "dotenv/config";

type Todo = {
  id: number;
  user_id: string;
  task: string;
  note: string;
  priority: "none" | "low" | "medium" | "high";
  location?: string;
  attachment?: string;
  is_complete: boolean;
  is_pin: boolean;
  created_at: Date;
  updated_at: Date;
  remind_at: Date;
};

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const router = Router();

// CREATE TODO
router.post("/", async (req: Request, res: Response) => {
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
    } = req.body as Todo;

    const { data: newTodo, error }: PostgrestResponse<Todo[]> = await supabase
      .from("todos")
      .insert({
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
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

// GET ALL TODOS
router.get("/", async (req: Request, res: Response) => {
  try {
    const { user_id } = req.query;
    const { data: todos, error }: PostgrestResponse<Todo[]> = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user_id)
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    res.json(todos || []);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

// GET SINGLE TODO
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data: todo, error }: PostgrestResponse<Todo[]> = await supabase
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
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

// UPDATE TODO
router.put("/:id", async (req: Request, res: Response) => {
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
    } = req.body as Todo;

    const { data: updatedTodo, error }: PostgrestResponse<Todo[]> =
      await supabase
        .from("todos")
        .update([
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
          },
        ])
        .eq("id", id)
        .select();

    if (error) {
      throw error;
    }

    res.json(updatedTodo[0]);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

// DELETE TODO
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data: deletedTodo, error }: PostgrestResponse<Todo[]> =
      await supabase.from("todos").delete().eq("id", id).single();

    if (error) {
      throw error;
    }

    res.json(deletedTodo);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

export default router;
