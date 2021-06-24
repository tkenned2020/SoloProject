const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Image, User, Album, Comment } = require("../../db/models/");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const upload = require("../../uploadMiddleware");
const Resize = require("../../Resize");

const imageNotFoundError = (id) => {
  const err = Error(`Image ${id} not found`);
  err.title = "Image not found";
  err.status = 404;
  return err;
};

const imageValidators = [
  check("content")
    .exists({ checkFalsy: true })
    .withMessage("Express within a caption")
    .isLength({ max: 50 })
    .withMessage("content must be less than 50 characters!")
    .custom((value) => {
      let emptyString = "  ";
      if (value.trim() === emptyString.trim()) {
        throw new Error("Content cannot be an empty space");
      }
      return true;
    }),
];

router.get(
  /*when i create an image:
    i want to be able to import an image via url or computer
    */
  "/:userId",
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    // res.send('test')
    const image = await Image.findAll({
      where: { userId },
    });

    // res.send('here')
    res.json({ image });
  })
);

router.post(
  "/postImage",
  upload.single("image"),
  requireAuth,
  imageValidators,
  asyncHandler(async (req, res) => {
    const newImage = new Image({
      imageName,
    });
  })
);

router.put(
  "/:imageId",
  asyncHandler(async (req, res) => {
    const { imageId } = req.params.imageId;
    const image = await Image.findById(imageId);
    // const imageUpdate = await Image.update()
    const images = await Image.findAll();
    res.json(images);
  })
);
router.delete(
  "/:imageId",
  asyncHandler(async (req, res) => {
    const { imageId } = req.params.imageId;
    const image = await Image.findById(imageId);
    await image.destroy();
    const images = await Image.findAll();
    res.json(images);
  })
);

module.exports = router;
