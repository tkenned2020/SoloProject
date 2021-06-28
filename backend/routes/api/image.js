const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Image, User, Album, Comment } = require("../../db/models/");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const upload = require("../../awsS3");
// const path = require("path");
// const fs = require("fs");
const multer = require("multer");
const { singleMulterUpload, singlePublicFileUpload,  multipleMulterUpload,  multiplePublicFileUpload, } = require("../../awsS3");


// const storage = multer.diskStorage({
//   destination: function (req, file, cb){
//     cb(null, "uploads")
//   },
//   filename: function(req, file, cb){
//     cb(null, file.originalname)
//   }
// })

// const uploads = multer({ storage })

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

router.get( "/:userId", asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
      const image = await Image.findAll({
      where: { userId }
    });
   return res.json({ image });
  })
);

router.post('/', singleMulterUpload('image'), asyncHandler(async(req, res) => {
  const { userId } = req.params;
  const imageUrl = await singlePublicFileUpload(req.file)
  const newImage = await Photo.create({
      userId,
      imageUrl
  })
  return res.json(newImage);
}));


router.put('/:imageId', singleMulterUpload('image'), asyncHandler(async (req, res) => {
  const { imageId } = req.params
  const imageUrl = await singlePublicFileUpload(req.file)
  const image = await Image.findByPk(imageId)
  image.imageUrl = imageUrl
  await image.save();
  return res.json(image);
}));

router.delete(
  "/:imageId",
  asyncHandler(async (req, res) => {
    const { imageId }  = req.params;
    const image = await Image.findById(imageId);
    await image.destroy();
    const images = await Image.findAll();
    return res.json(images);
  })
);

module.exports = router;
