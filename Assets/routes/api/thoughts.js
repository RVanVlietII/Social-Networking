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

thoughtRoutes //working-ish
    .route('/')
    .get(getAllThoughts)
    .post(createThoughts);

thoughtRoutes //works but need to find out why its a 404 response
    .route('/:thoughts_Id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts)

thoughtRoutes
    .route('/:thoughts_Id/reactions')
    .post(createReaction);

thoughtRoutes
    .route('/:thoughts_Id/reactions/:reaction_Id')
    .delete(deleteReaction);

module.exports = thoughtRoutes;