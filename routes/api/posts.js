const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("./../../models/Post");
const Profile = require("./../../models/Profile");
//Validation
const validatePostInput = require("./../../validation/post/post");

//@router GET api/posts
//@desc get posts
//@access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json(err));
});

//@router GET api/posts/id
//@desc get a post
//@access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopost: "There is no post for given id" })
    );
});

//@router Delete api/posts/id
//@desc delete a post
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({
                  unauthorized: "You are not allowed to delete this post",
                });
            }
            post.remove().then(() => res.json({ success: true }));
          })
          .catch((err) => res.status(404).json({ nopost: "No post found" }));
      })
      .catch((err) =>
        res.status(404).json({ postnotfound: "No post found with given ID" })
      );
  }
);

//@router POST api/posts/like/:id
//@desc Like post
//@access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id).then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }
          post.likes.unshift({ user: req.user.id });
          post.save().then((post) => res.json(post));
        });
      })
      .catch((err) => res.status(404).json({ postnotfound: "Post not found" }));
  }
);

//@router Delete api/posts/unlike/:id
//@desc Unlike post
//@access Private
router.delete(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ dislike: "You have not liked this post" });
          }
          const removeIndexOfLike = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(removeIndexOfLike, 1);
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

//@router POST api/post
//@desc Create post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //Check validation
    if (!isValid) {
      return res.status(401).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });
    newPost.save().then((post) => res.json(post));
  }
);

//@router POST api/posts/comment/:id
//@desc Create post
//@access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //Check validation
    if (!isValid) {
      return res.status(401).json(errors);
    }
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };
        post.comments.unshift(newComment);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "Post not found" }));
  }
);

//@router DELETE api/posts/comment/:id/:comment_id
//@desc Remove comment
//@access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentdoesnotexist: "Comment does not exist" });
        }
        const removeCommentIndex = post.comments
          .map((comment) => comment._id.toString())
          .indexOf(req.params.comment_id);
        post.comments.splice(removeCommentIndex, 1);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "Post not found" }));
  }
);

module.exports = router;
