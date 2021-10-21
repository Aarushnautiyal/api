const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("user is up and running");
});

module.exports = router;
