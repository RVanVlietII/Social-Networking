const { User, Thoughts } = require('../models');

const thoughtsController = {
  // /api/thoughts

  // get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400).json({
          message: 'Thoughts not working correctly'
        });
      });
  },

  // get one thoughts by id
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ 
            message: 'No thoughts found with that id!' 
          });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400).json({
          error: "Bad Request",
          message: "The request couldn't be processed due to client error"
        });
      });
  },

  createThoughts({ body }, res) {
    Thoughts.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ 
                  message: 'No user found with this id!' 
                });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
},

  // update Thought by id
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ 
            message: 'No thoughts found with that id!' 
          });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  // delete thought by ID
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ 
            message: 'No thoughts found with that id!' 
          });
          return;
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.Id } },
          { new: true }
        )
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
      .catch(err => res.json(err));
  },

  createReaction({params, body}, res) {
    Thoughts.findOneAndUpdate(
      {_id: params.thoughtsId}, 
      {$push: {reactions: body}}, 
      {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({
              message: 'No thoughts with this ID.'
            });
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json({
      error: "Bad Request",
      message: "The request could not be processed due to client errors."
  }))
},

  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ 
            message: 'Nope!'
          });
          return;
        }
       res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  }


};

module.exports = thoughtsController;


// const { User, Thoughts } = require('../models');

// module.exports = {
//   async getThoughts(req, res) {
//     try {
//       const Thoughts = await Thoughts.find();
//       res.json(Thoughts);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
//   async getSingleThoughts(req, res) {
//     try {
//       const Thoughts = await Thoughts.findOne({ _id: req.params.videoId })

//       if (!Thoughts) {
//         return res.status(404).json({ message: 'No video with that ID' });
//       }

//       res.json(Thoughts);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
//   // create a new video
//   async createThoughts(req, res) {
//     try {
//       const Thoughts = await Thoughts.create(req.body);
//       const user = await User.findOneAndUpdate(
//         { _id: req.body.userId },
//         { $addToSet: { Thoughts: Thoughts._id } },
//         { new: true }
//       );

//       if (!user) {
//         return res.status(404).json({
//           message: 'Thoughts created, but found no user with that ID',
//         });
//       }

//       res.json('Created the Thoughts 🎉');
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   },
//   async updateThoughts(req, res) {
//     try {
//       const Thoughts = await Thoughts.findOneAndUpdate(
//         { _id: req.params.videoId },
//         { $set: req.body },
//         { runValidators: true, new: true }
//       );

//       if (!Thoughts) {
//         return res.status(404).json({ message: 'No video with this id!' });
//       }

//       res.json(Thoughts);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   },
//   async deleteThoughts(req, res) {
//     try {
//       const Thoughts = await Thoughts.findOneAndRemove({ _id: req.params.ThoughtsId });

//       if (!Thoughts) {
//         return res.status(404).json({ message: 'No thoughts with this id!' });
//       }

//       const user = await User.findOneAndUpdate(
//         { Thoughts: req.params.ThoughtsId },
//         { $pull: { videos: req.params.ThoughtsId } },
//         { new: true }
//       );

//       if (!user) {
//         return res
//           .status(404)
//           .json({ message: 'Thoughts created but no user with this id!' });
//       }

//       res.json({ message: 'Video successfully deleted!' });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
//   // Add a video response
//   async addThoughtsResponse(req, res) {
//     try {
//       const Thoughts = await Thoughts.findOneAndUpdate(
//         { _id: req.params.ThoughtsId },
//         { $addToSet: { responses: req.body } },
//         { runValidators: true, new: true }
//       );

//       if (!Thoughts) {
//         return res.status(404).json({ message: 'No thoughts with this id!' });
//       }

//       res.json(Thoughts);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
//   // Remove video response
//   async removeThoughtsResponse(req, res) {
//     try {
//       const Thoughts = await Thoughts.findOneAndUpdate(
//         { _id: req.params.ThoughtsId },
//         { $pull: { reactions: { responseId: req.params.responseId } } },
//         { runValidators: true, new: true }
//       )

//       if (!Thoughts) {
//         return res.status(404).json({ message: 'No thoughts with this id!' });
//       }

//       res.json(Thoughts);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
// };

// module export = thoughtsController;
