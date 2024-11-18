import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

export const UserModel = mongoose.model("User", UserSchema);

const TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: Date,
  important: Boolean,
  isComplete: Boolean,
});

export const TaskModel = mongoose.model("Task", TaskSchema);
