const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Image, User, Comment } = require("../../db/models/");
const { requireAuth } = require("../../utils/auth");

router.get("/:photoId", asyncHandler( async(req, res) => {
    const photoId = parsInt(req.params.photoId)
    const comments = await Comment.findAll({
        where: {
            photoId
        },
        include: User
    });
    return res.json(comments)
}));

router.post("/photoId", requireAuth, asyncHandler(async (req, res) =>{
    const photoId = parsInt(req.params.photoId)
    const {body, userId} = req.body;
    //const createComment = await Comment.build();
    const createComment = await Comment.create({photoId, body, userId});
    const createdComment = await Comment.findByPk(createComment.id, {include: User});
    return res.json(createdComment);
}));

router.put("/photoId", requireAuth, asyncHandler(async (req, res) =>{
   const  photoId = parsInt(req.params.photoId);
   const { body } = req.body;
   const comment = await Comment.findOne({where: { id: photoId }});
   await comment.update({body: body});
   return res.json(comment);
}));

router.delete("/:commentId", requireAuth, asyncHandler(async (req, res) =>{
    const commentId = parsInt(req.params.id);
    const comment = await Comment.findById(commentId);
    await comment.destroy();

}));
