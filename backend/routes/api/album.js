const express = require("express");
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { Album, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require('express-validator');

const albumValidators = [
    check("title")
      .exists({ checkFalsy: true })
      .withMessage("Enter an Album name")
      .isLength({ max: 50 })
      .withMessage("Album title must be less than 50 characters!")
      .custom((value) => {
        let emptyString = "  ";
        if (value.trim() === emptyString.trim()) {
          throw new Error("Album cannot be empty space");
        }
        return true;
      }),
  ];

router.get("/", asyncHandler( async (req, res) => {
    const album = await Album.findAll();
    res.json(album)
}))

router.get("/create", requireAuth, asyncHandler( async (req, res) =>{
    const { userId, title } = req.body;
    const album = await Album.build();

    res.json(album);


}))

router.post("/", requireAuth, asyncHandler(async (req, res) =>{
    const { userId } = req.params;
    const { title } = req.body;

    res.send('I\'m working!!')
}))
router.put("/:albumId", asyncHandler(async (req, res) =>{
    res.send('I\'m working!!!')
}))
router.delete("/:albumId", requireAuth, asyncHandler(async (req, res) =>{
    const {albumId} = req.params.albumId;
    const album = await Album.findById(albumId);
    await album.destroy();
    const albums = await Album.findAll();
    res.json(albums);

}))

module.exports = router;
