const router = require("express").Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// Route (get, or post): /api/users
router.route("/").get(getAllUser).post(createUser);

// Route (get, post, or delete): /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Route (post, or delete): /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;