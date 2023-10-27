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

// /api/user (good to go)
userRoutes
  .route('/')
  .get(getUser)
  .post(createUser);

// /api/user/:userId (good to go)
userRoutes
  .route('/:user_Id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// // /api/user/:userId/thoughts
// userRoutes
//   .route('/:user_Id/thoughts')
//   .post(createThought);

// /api/user/:userId/thoughts/:thoughtsId (works)
userRoutes
  .route('/:user_Id/thoughts/:thoughts_Id')
  .delete(deleteThought);

// /api/user/:userId/friends/:friendId (works)
userRoutes
  .route('/:user_Id/friends/:friend_Id')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = userRoutes;
