const rateLimit = require("express-rate-limit");

// Define a rate limit rule
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 1000, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

export default limiter;
