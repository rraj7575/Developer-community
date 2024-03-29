const gravatar = require("gravatar");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./../../config/keys");
const passport = require("passport");
const User = require("./../../models/User");

//Load input validation
const validateRegisterInput = require("../../validation/user/register");
const validateLoginInput = require("../../validation/user/login");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch(console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = validateLoginInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(401).json(errors);
  }

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User Not Found";
      return res.status(400).json(errors);
    }

    //Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User Matched

        const payloads = {
          id: user.id,
          name: user.name, //Create JWT Payloads
          avatar: user.avatar,
        };
        //Sign Token
        jwt.sign(
          payloads,
          keys.secretKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              msg: "Success",
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route GET api/users/current
//@desc Return current user
//@access Private route

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.name,
      email: req.email,
    });
  }
);
module.exports = router;
