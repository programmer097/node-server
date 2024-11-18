import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

// Dummy user database
const users: User[] = [{ id: 1, username: "testuser", password: "password" }];

// Configure Passport.js
passport.use(
  new LocalStrategy((username: string, password: string, done: Function) => {
    const user = users.find((user) => user.username === username);
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

// Serialize and deserialize user information
passport.serializeUser((user, done) => {
  done(null, (user as any).id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

interface User {
  id: number;
  username: string;
  password: string;
}

export default passport;
