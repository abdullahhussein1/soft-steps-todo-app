"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Supabase client
const supabaseUrl = "https://segqjlhodxcykvbdnqfd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlZ3FqbGhvZHhjeWt2YmRucWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzNzcxMzcsImV4cCI6MjAyMTk1MzEzN30.LdpvQ9vD2JbPOK8h0Pjw5Z3ll3d4_c7Or_FNlNaNYEE";
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const router = (0, express_1.Router)();
// CREATE TODO
router.post("/", async (req, res) => {
    try {
        const { user_id, task, note, priority, location, attachment, is_complete, is_pin, remind_at, } = req.body;
        const { data: newTodo, error } = await supabase
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
    }
    catch (err) {
        console.error(err);
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});
// GET ALL TODOS
router.get("/", async (_req, res) => {
    try {
        const { data: todos, error } = await supabase
            .from("todos")
            .select("*")
            .order("id", { ascending: true });
        if (error) {
            throw error;
        }
        res.json(todos || []);
    }
    catch (err) {
        console.error(err);
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
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
    }
    catch (err) {
        console.error(err);
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});
// UPDATE TODO
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { task, note, priority, location, attachment, is_complete, is_pin, remind_at, updated_at, } = req.body;
        const { data: updatedTodo, error } = await supabase
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
    }
    catch (err) {
        console.error(err);
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});
// DELETE TODO
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data: deletedTodo, error } = await supabase.from("todos").delete().eq("id", id).single();
        if (error) {
            throw error;
        }
        res.json(deletedTodo);
    }
    catch (err) {
        console.error(err);
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kb3NSb3V0ZUFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvYXBpL3RvZG9zUm91dGVBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBb0Q7QUFDcEQsdURBQXdFO0FBQ3hFLG9EQUE0QjtBQUU1QixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBaUJoQiw2QkFBNkI7QUFDN0IsTUFBTSxXQUFXLEdBQUcsMENBQTBDLENBQUM7QUFDL0QsTUFBTSxXQUFXLEdBQ2Ysa05BQWtOLENBQUM7QUFFck4sTUFBTSxRQUFRLEdBQUcsSUFBQSwwQkFBWSxFQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUV4RCxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUV4QixjQUFjO0FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUNyRCxJQUFJLENBQUM7UUFDSCxNQUFNLEVBQ0osT0FBTyxFQUNQLElBQUksRUFDSixJQUFJLEVBQ0osUUFBUSxFQUNSLFFBQVEsRUFDUixVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixTQUFTLEdBQ1YsR0FBRyxHQUFHLENBQUMsSUFBWSxDQUFDO1FBRXJCLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUE4QixNQUFNLFFBQVE7YUFDdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNiLE1BQU0sQ0FBQztZQUNOLE9BQU87WUFDUCxJQUFJO1lBQ0osSUFBSTtZQUNKLFFBQVE7WUFDUixRQUFRO1lBQ1IsVUFBVTtZQUNWLFdBQVc7WUFDWCxNQUFNO1lBQ04sU0FBUztTQUNWLENBQUM7YUFDRCxNQUFNLEVBQUUsQ0FBQztRQUVaLElBQUksS0FBSyxFQUFFLENBQUM7WUFDVixNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7UUFF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