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
    Thoughts.findOne({ _id: params.thoughts_Id })
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
    // Thoughts.create(body)
    //     .then(({ _id }) => {
    //         return User.findOneAndUpdate(
    //             { _id: body.user_Id },
    //             { $push: { thoughts: _id } },
    //             { new: true }
    //         );
    //     })
    //     .then(dbThoughtsData => {
          
    //         if (!dbThoughtsData) {
    //             res.status(404).json({ 
    //               message: 'No user found with this id!' 
    //             });
    //             return;
    //         }
    //         res.status(200).json(dbThoughtsData);
    //     })
    //     .catch(err => res.json(err));
    Thoughts.create(body)
        .then(({ _id }) => {
            const dbThoughtsData = User.findOneAndUpdate(
                { _id: body.user_Id },
                { $push: { thoughts: _id } },
                { new: true }
            );
            
            if (!dbThoughtsData) {
                res.status(404).json({ 
                  message: 'No user found with this id!' 
                });
                return;
            }

            res.status(200).json(dbThoughtsData);
     
        })
        .catch(err => res.json(err));
},

  // update Thought by id
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.thoughts_Id }, body, { new: true, runValidators: true })
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
    Thoughts.findOneAndDelete({ _id: params.thoughts_Id })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ 
            message: 'No thoughts found with that id!' 
          });
          return;
        }
        return User.findOneAndUpdate(
          { _id: params.user_Id },
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
      {_id: params.thoughts_Id}, 
      {$addToSet: {reactions: body}}, 
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
    .catch(err => {
      console.log(err);
      res.status(400).json({
      error: "Bad Request",
      message: "The request could not be processed due to client errors."
  })})
},

  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughts_Id },
      { $pull: { reactions: { reactionId: params.reaction_Id } } },
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