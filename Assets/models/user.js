const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /^\S+@\S+\.\S+$/ 
    },
    thoughts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Thought', 
    }],
    friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
            
    }]
    
});

userSchema
    .virtual('friendCount')
    .get(function(){
    return this.friends.length;
});

// Set the 'toJSON' option to include virtuals and getters
userSchema
    .set('toJSON', { virtuals: true, getters: true });

// Omit the '_id' field from the JSON representation
userSchema
    .set('toObject', { getters: true, virtuals: true });

const User = model('User', userSchema);

module.exports = User;