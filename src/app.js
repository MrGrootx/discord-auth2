import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;
import session from "express-session";
import passport from "passport";
import discordStrategy from "./strategies/discordstrategy.js";

// Routes
import authRouter from "./routes/auth.js";

app.use(
  session({
    secret: "secret",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("Now lestening on port", PORT);
});
