const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThoughts);

router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

router
    .route('/:thoughtsId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;