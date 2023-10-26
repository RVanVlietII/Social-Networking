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

// /api/users (good to go)
userRoutes
  .route('/')
  .get(getUser)
  .post(createUser);

// /api/users/:userId (good to go)
userRoutes
  .route('/:user_Id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// // /api/users/:userId/thoughts
// userRoutes
//   .route('/:user_Id/thoughts')
//   .post(createThought);

// /api/users/:userId/thoughts/:thoughtsId
userRoutes
  .route('/:user_Id/thoughts/:thoughts_Id')
  .delete(deleteThought);

// /api/users/:userId/friends/:friendId
userRoutes
  .route('/:user_Id/friends/:friend_Id')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = userRoutes;
