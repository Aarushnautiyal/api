const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("auth is up and running");
});
// Register
router.post("/register", async (req, res) => {
  try {
    // pass hashing
    const salt = await bcrypt.genSalt(12);
    const hashedpass = await bcrypt.hash(req.body.password, salt);
    // creating user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedpass,
    });
    // Saving User
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    // Saving User
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");
    const checker = await bcrypt.compare(req.body.password, user.password);
    !checker && res.status(404).json("Wrong Password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(err);
  }
});

// Verify

router.post("/verify", async (req, res) => {
  try {
    // Saving User
    const user = await User.findOne({ _id: req.body.id });
    !user && res.status(404).json("user not found");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(err);
  }
});
// it will gonna port to localhost/verify not api/auth/verify
module.exports = router;
