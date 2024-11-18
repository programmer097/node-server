import express from "express";
import passport from "../middleware/passport";
const router = express.Router();

router.get("/login", (req, res) =>
  res.send(
    '<form method="post" action="/passport/login"><input name="username"/><input name="password" type="password"/><button>Login</button></form>'
  )
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/passport/profile",
    failureRedirect: "/login",
  })
);

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  res.send(`Hello, ${(req.user as any).username}`);
});

export default router;
