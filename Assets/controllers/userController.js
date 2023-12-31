const { User, Thoughts } = require('../models');

const userController = {
  // /api/users
  // get all users
  getUser(req, res) {
    User.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400).json({
          message: 'No users found'
        });
      });
  },

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.user_Id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ 
            message: 'No User found with this id!'
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json({
        error: "Bad Request",
        message: "The request could not be processed due to client errors."
  }));
  },

  // create User
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json({
        message: 'no User created',
      }));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.user_Id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ 
            message: 'No User found with this id!' 
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json({
        message: 'unable to update user correctly'
      }));
  },

  //Delete user and users associated thoughts
  deleteUser({ params }, res) {
    User.findOne({ _id: params.user_Id })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ 
          message: 'No User found with this id!' 
        });
        return;
      }

      // Now, delete the associated thoughts
      return Thoughts.deleteMany({ userId: params.user_Id })
        .then(() => {
          // Finally, delete the user
          return User.findOneAndDelete({ _id: params.user_Id });
        });
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ 
          message: 'No User found with this id!' 
        });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json({
      message: 'Unable to delete user'
    }));
},
  createThought({ params, body }, res) {
   User.findOneAndUpdate(
      { _id: params.user_Id },
      { $push: { thoughts: body } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ 
            message: 'No user found with this id' 
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({
        error: "Bad Request",
        message: "The request could not be processed due to client errors."
      })});
  },

  // Delete a thought for a user
  deleteThought({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.user_Id },
      { $pull: { thoughts: { _id: params.thoughts_Id } } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ 
            message: 'No user found with this id' 
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json({
        error: "Bad Request",
        message: "The request could not be processed due to client errors."
      }));
  },

  // /api/users/:userid/friends/:friendId
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.user_Id },
      { $push: { friends: params.friend_Id } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ 
            message: 'No user found with this id' 
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(400).json({
          error: "Bad Request",
          message: "The request could not be processed due to client errors."
      })
    });
  },
  
  

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.user_Id },
      { $pull: { friends: params.friend_Id } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ 
            message: 'No user found with this id' 
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json({
        error: "Bad Request",
        message: "The request could not be processed due to client errors."
      }));
    }};

module.exports = userController;