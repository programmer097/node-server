import { Router } from "express";
import { UserModel } from "../models/mongodb.models";
import { authenticateToken } from "../middleware/auth";

const router = Router();

//get all users
router.get("/", async (req, res) => {
  try {
    const user = await UserModel.find();
    console.log("All users:", user);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//create new user
router.post("/create", async (req, res) => {
  const { name, age, email } = req.body;
  try {
    const newUser = await new UserModel({
      name: name,
      age: age,
      email: email,
    });
    await newUser.save();
    console.log("User saved:", newUser);

    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
});

export default router;
