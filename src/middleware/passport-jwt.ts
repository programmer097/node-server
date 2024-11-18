import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

// Secret key for JWT (in a real app, keep it in an env variable)
const JWT_SECRET = "your_jwt_secret";

// Dummy user database
const users = [{ id: 1, username: "testuser", password: "password" }];

// Passport JWT Strategy configuration
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (jwtPayload, done) => {
      // Find user based on the JWT payload's user ID
      const user = users.find((u) => u.id === jwtPayload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
);

export default passport;
