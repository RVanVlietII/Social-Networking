const userRoutes = require('express').Router();

const {
  getUser,
  getUserById,
  createUser,
  updateUser, 
  deleteUser,
  createThought,
  deleteThought,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users
userRoutes
  .route('/')
  .get(getUser)
  .post(createUser);

// /api/users/:userId
userRoutes
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/thoughts
userRoutes
  .route('/:userId/thoughts')
  .post(createThought);

// /api/users/:userId/thoughts/:thoughtsId
userRoutes
  .route('/:userId/thoughts/:Id')
  .delete(deleteThought);

// /api/users/:userId/friends/:friendId
userRoutes
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = userRoutes;
