import { Router, Request, Response } from "express";
import { createClient, PostgrestResponse } from "@supabase/supabase-js";
import "dotenv/config";

type Step = {
  id: number;
  user_id: string;
  task: string;
  note: string;
  priority: "none" | "low" | "medium" | "high";
  location?: string;
  is_complete: boolean;
  is_pin: boolean;
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
  remind_at: Date;
};

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const router = Router();

// CREATE STEP
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      task,
      note,
      priority,
      location,
      is_complete,
      is_pin,
      remind_at,
    } = req.body as Step;

    const { data: newStep, error }: PostgrestResponse<Step[]> = await supabase
      .from("steps")
      .insert({
        user_id,
        task,
        note,
        priority,
        location,
        is_complete,
        is_pin,
        remind_at,
      })
      .select();

    if (error) {
      throw error;
    }

    res.status(201).json(newStep[0]);
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
    const { data: steps, error }: PostgrestResponse<Step[]> = await supabase
      .from("steps")
      .select("*")
      .eq("user_id", user_id)
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    res.json(steps || []);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

// GET SINGLE STEP
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data: step, error }: PostgrestResponse<Step[]> = await supabase
      .from("steps")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    res.json(step);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

// UPDATE STEP
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      task,
      note,
      priority,
      location,
      is_complete,
      deleted_at,
      is_pin,
      remind_at,
      updated_at,
    } = req.body as Step;

    const { data: updatedTodo, error }: PostgrestResponse<Step[]> =
      await supabase
        .from("steps")
        .update([
          {
            task,
            note,
            priority,
            location,
            is_complete,
            deleted_at,
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

// DELETE STEP
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data: deletedTodo, error }: PostgrestResponse<Step[]> =
      await supabase.from("steps").delete().eq("id", id).single();

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
