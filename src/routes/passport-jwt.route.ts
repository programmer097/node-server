import express from "express";
import jwt from "jsonwebtoken";
import passport from "../middleware/passport-jwt";
const router = express.Router();

// Middleware to check if the user is authenticated with JWT
const authenticateJWT = passport.authenticate("jwt", { session: false });
const JWT_SECRET = "12345678";
// Dummy user database
const users = [{ id: 1, username: "testuser", password: "password" }];

// Login route (returns a JWT token if credentials are correct)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });

  res.json({ token });
});

// Protected route (accessible only with a valid JWT token)
router.get("/profile", authenticateJWT, (req, res) => {
  res.json({
    message: "This is the profile page",
    user: req.user, // Passport will populate req.user based on JWT payload
  });
});

export default router;
