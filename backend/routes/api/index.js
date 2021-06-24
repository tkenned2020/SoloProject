const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const albumRouter = require("./album.js");
const imageRouter = require("./image.js");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/album", albumRouter);

router.use("/image", imageRouter);

router.post("./test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
