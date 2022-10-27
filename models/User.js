const { Schema , model, Types } = require('mongoose');

const userSchema = new Schema({
    username: {type: String , required: true , minLength:2 , maxLength:15 , unique: true},
    email: {type: String , required: true , unique: true},
    hashedPassword: {type: String , required: true , minLength: 3},
    roles: { type: [{ type: String, enum: ['user', 'admin'] }], default: ['user'] },
    bicycles: { type: [Types.ObjectId], default: [], ref: 'Bicycle' }
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});


const User = model('User' , userSchema);

module.exports = User;