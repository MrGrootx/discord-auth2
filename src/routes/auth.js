import express from "express";
const router = express.Router();
import passport from "passport";

router.get("/", passport.authenticate("discord"));

router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/forbidden",
    successRedirect: "/dashboard",
  }),
  (req, res) => {
    res.send(req.user);
  }
);

export default router;
