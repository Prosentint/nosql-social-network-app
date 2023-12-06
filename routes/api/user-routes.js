const router = require("express").Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// Route (get, or post): /api/users
router.route("/").get(getAllUsers).post(createUser);

// Route (get, post, or delete): /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Route (post, or delete): /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;