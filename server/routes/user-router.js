const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post("/signup", async (req, res, next) => {
  passport.authenticate("signup", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(info);
      }
      res.json({
        message: "Signup successful",
        user
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(info);
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { _id: user._id, email: user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, config.get("secretOrKey"));
        //Send back the token to the user
        return res.json({
          token,
          email: user.email,
          id: user._id,
          orders: user.orders,
          name: user.name
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get("/logout", function(req, res) {
  req.logout();
  res.status(200).send({ msg: "Logout successful" });
});

router.get("/profile", function(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(info);
    }
    res.status(200).send({ auth: true, ...user });
  })(req, res, next);
});

module.exports = router;
