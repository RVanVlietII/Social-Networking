const { Schema, model} = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({
    reactionId: { 
        type: Schema.Types.ObjectId, 
        default: () => new mongoose.Types.ObjectId() 
    },
    reactionBody: { 
        type: String, 
        required: true, 
        maxlength: 280 
    },
    username: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        get: createdAtVal => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm a')},
},
    { 
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    },

  );

const ThoughtSchema = new Schema({
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
    username: { 
        type: String, 
        required: true 
    },
    reactions: [ReactionSchema]
    },

        { 
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false,
            toObject: {
                getters: true,
                virtuals: true
            }
        },

);

// { type: mongoose.Schema.Types.ObjectId, ref: 'Reaction'}
ThoughtSchema
    .virtual('reactionCount')
    .get(function() {
    return this.reactions.length;  
});

const Thoughts = model('Thought', ThoughtSchema);

module.exports = Thoughts;