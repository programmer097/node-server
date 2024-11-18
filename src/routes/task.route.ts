import { Router } from "express";
import { TaskModel } from "../models/mongodb.models";
import express from "express";

const router = Router();
const app = express();

app.use(express.json());

// get task list
router.get("/", async (req, res) => {
  const result = await TaskModel.find();
  res.json(result).status(200);
});

//create new task
router.post("/create", async (req, res) => {
  const { name, description, dueDate, important, isComplete } = req.body;

  try {
    const newTask = new TaskModel({
      name,
      description,
      important,
      isComplete,
      dueDate: new Date(dueDate),
    });

    const result = await newTask.save();
    res.json(result).status(201);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error" });
  }
});

export default router;
