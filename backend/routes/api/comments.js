const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Image, User, Comment } = require("../../db/models/");
const { requireAuth } = require("../../utils/auth");

router.get("/:imageId", asyncHandler( async(req, res) => {
    const { imageId } = req.params;
    const allComments = await Comment.findAll({
    where: { imageId }, include: User });
    return res.json(allComments)
}));

router.post("/imageId", requireAuth, asyncHandler(async (req, res) =>{
    const { imageId } = req.params;
    const {textfield, userId} = req.body;
    const createComment = await Comment.create({imageId, textfield, userId});
    const createdComment = await Comment.findByPk(createComment.id, {include: User});
    return res.json(createdComment);
}));

router.put("/imageId", requireAuth, asyncHandler(async (req, res) =>{
   const { imageId } = req.params;
   const { textfield } = req.body;
   const comment = await Comment.findOne({where: { id: imageId }});
   await comment.update({ textfield });
   return res.json(comment);
}));

router.delete("/:commentId", requireAuth, asyncHandler(async (req, res) =>{
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    await comment.destroy();

}));

module.exports = router;
