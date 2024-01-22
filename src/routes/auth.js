import express from "express";
const router = express.Router();
import passport from "passport";

router.get("/", passport.authenticate("discord"));

router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/forbidden",
  }),
  (req, res) => {
    res.send(200);
  }
);

export default router;