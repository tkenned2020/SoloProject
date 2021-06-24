const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Image, User, Album, Comment } = require("../../db/models/");
const { requireAuth } = require("../../utils/auth");

router.post("/comments", asyncHandler(async (req, res) =>{
    res.send('I\'m working!!')
}))
router.put("/update-comment", asyncHandler(async (req, res) =>{
    res.send('I\'m working!!!')
}))
router.delete("/:commentId", requireAuth, asyncHandler(async (req, res) =>{
    const {commentId} = req.params.commentId;
    const comment = await Comment.findById(commentId);
    await comment.destroy();
    const comments = await Comment.findAll();
    res.json(comments);
}))
