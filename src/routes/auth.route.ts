import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

const users: { [key: string]: string } = {}; // In-memory user store (for demo purposes)

// Protected route
router.get("/profile", authenticateToken, (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  res.json({ message: `Welcome ${user.username}!` });
});

// Register new credential
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = hashedPassword;

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userPassword = users[username];
  if (!userPassword) {
    return res.status(404).json({ error: "User not found" });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, userPassword);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate a JWT token
  const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
});

export default router;
