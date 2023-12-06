const { User, Thought } = require("../models");

const UserController = {
  // Create User
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((error) => res.json(error));
  },

  // Gets all Users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((error) => {
        console.error(error);
        res.sendStatus(400);
      });
  },

  // Gets a User by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "User not found with this ID!" });
        }
        res.json(userData);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(400);
      });
  },

  // Update User by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(userData);
      })
      .catch((error) => res.json(error));
  },

  // Remove User by ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "No user found with this ID!" });
        }
        // Bonus: Delete all user thoughts upon deletion
        return Thought.deleteMany({ _id: { $in: userData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and associated thoughts deleted!" });
      })
      .catch((error) => res.json(error));
  },

  // Add User as Friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID" });
          return;
        }
        res.json(userData);
      })
      .catch((error) => res.json(error));
  },

  // Remove User as friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "No user found with this ID!" });
        }
        res.json(userData);
      })
      .catch((error) => res.json(error));
  },
};

module.exports = UserController;