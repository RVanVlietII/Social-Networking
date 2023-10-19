const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
    reactionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        default: () => new mongoose.Types.ObjectId() 
    },
    reactionBody: { 
        type: String, 
        required: true, 
        maxlength: 280 },
    username: { 
        type: String, 
        required: true },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        get: createdAtVal => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm a')},
    timestamp: {
        type: Date, 
        default: Date.now
    },
},
    { 
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    },

  );

const ThoughtSchema = new mongoose.Schema({
    thoughtText: { 
        type: String, 
        required: true, 
        minlength: 1, 
        maxlength: 280 
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm a')  
    },
    timestamp: {
        type: Date, 
        default: Date.now
    },
    username: { 
        type: String, 
        required: true },
    reactions: [ReactionSchema]
    },

        { 
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false,
        },

);

// { type: mongoose.Schema.Types.ObjectId, ref: 'Reaction'}
ThoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;  
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;