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

//  api/thoughts
thoughtRoutes //working-ish
    .route('/')
    .get(getAllThoughts)
    .post(createThoughts);

//  api/thoughts/:thoughts_Id
thoughtRoutes //works but need to find out why its a 404 response
    .route('/:thoughts_Id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts)

//  api/thoughts/:thoughts_Id/reactions
thoughtRoutes
    .route('/:thoughts_Id/reactions')
    .post(createReaction);

//  api/thoughts/:thoughts_Id/reactions/:reaction_Id
thoughtRoutes
    .route('/:thoughts_Id/reactions/:reaction_Id')
    .delete(deleteReaction);

module.exports = thoughtRoutes;