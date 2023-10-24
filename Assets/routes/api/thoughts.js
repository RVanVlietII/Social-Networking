const thoughtRoutes = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

thoughtRoutes
    .route('/')
    .get(getAllThoughts)
    .post(createThoughts);

thoughtRoutes
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

thoughtRoutes
    .route('/:thoughtsId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = thoughtRoutes;