import dotenv from "dotenv";
dotenv.config();

import DiscordStrategy from "passport-discord";
DiscordStrategy.Strategy;

import passport from "passport";

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: ["identify", "guilds"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile.username);
      console.log(profile.id);
      console.log(profile.guilds.length);
    }
  )
);

export default passport
