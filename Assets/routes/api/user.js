const userRoutes = require('express').Router();

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
userRoutes
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/users/:userId
userRoutes
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/thoughts
// router
//   .route('/:userId/thoughts')
//   .post(createThoughts);

// /api/users/:userId/thoughts/:thoughtsId
// router
//   .route('/:userId/thoughts/:Id')
//   .delete(removeThoughts);

// /api/users/:userId/friends/:friendId
userRoutes
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = userRoutes;
