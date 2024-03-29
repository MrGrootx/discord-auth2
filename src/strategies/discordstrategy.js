import dotenv from "dotenv";
dotenv.config();

import DiscordStrategy from "passport-discord";
DiscordStrategy.Strategy;

import passport from "passport";
import DiscordUser from "../schemas/discordUser.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await DiscordUser.findById(id);
  if (user) done(null, user);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: ["identify", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await DiscordUser.findOne({ discordId: profile.id });

        if (user) {
          done(null, user);
        } else {
          const newUser = await DiscordUser.create({
            discordId: profile.id,
            username: profile.username,
          });

          const savedUser = await newUser.save();
          done(null, savedUser);
        }
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);

export default passport;
