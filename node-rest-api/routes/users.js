const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(200).json("Account has been updated");
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.id });

      res.status(200).json("Account has been deleted");
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
});

//get an user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  console.log(userId, username);

  try {
    // const user = await User.findById({ _id: req.params.id })

    const user = userId
      ? await User.findById({ _id: userId })
      : await User.findOne({ username: username });

    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

//get friends

router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });

    res.status(200).json(friendList);
  } catch (e) {
    res.status(500).json(e);
  }
});

//follow an user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You cant follow yourself");
  }
});

//unfollow an user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You already unfollowed this user");
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You cant unfollow yourself");
  }
});

module.exports = router;
