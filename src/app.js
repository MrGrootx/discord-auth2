import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;
import session from "express-session";
import passport from "passport";
import discordStrategy from "./strategies/discordstrategy.js";
import db from "./DB/DBconnection.js";

db.then(() => console.log('Connected to Database')).catch(err => console.log(err));

// Routes
import authRouter from "./routes/auth.js";
import dashboardRoute from "./routes/dashboard.js";

app.use(
  session({
    secret: "secret",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
    name: "discord.oauth2",
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());


// Middleware
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRoute);

app.listen(PORT, () => {
  console.log("Now lestening on port", PORT);
});
