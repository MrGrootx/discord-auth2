import express from "express";
const router = express.Router();

function isAuthorized(req, res, next) {
  if (req.user) {
    console.log("User is logged in");
    console.log(req.user);
    next();
  } else {
    console.log("User is Notlogged in");
    res.redirect("/");
  }
}

router.get("/", isAuthorized, (req, res) => {
  res.send(200);
});

router.get("/settings", isAuthorized, (req, res) => {
   res.send(200);
 });

export default router;
