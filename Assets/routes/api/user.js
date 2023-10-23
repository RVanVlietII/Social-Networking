const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser, //post
  deleteUser, //delete
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users
router
  .route('/')
  .get(getUsers)
  .post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/thoughts
router
  .route('/:userId/thoughts')
  .post(addThought);

// /api/users/:userId/thoughts/:thoughtsId
router
  .route('/:userId/thoughts/:thoughtsId')
  .delete(removeThoughts);

// /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
