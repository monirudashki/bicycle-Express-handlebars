const bcrypt = require('bcrypt');
const User = require('../models/User');

async function register(username , email, password , errors) {
    const existingUsername = await User.findOne({username}).collation({ locale: 'en' , strength: 2});
    console.log(existingUsername);
    if(existingUsername) {
        return errors.push(`Username is taken!`);;
    };

    const existingEmail = await User.findOne({email}).collation({ locale: 'en' , strength: 2});
    if(existingEmail) {
        return errors.push(`Email is taken!`);
    };

    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await User.create({
        username,
        email,
        hashedPassword
    });

    return {
        id: user._id,
        username,
        email,
        roles: user.roles
    }
}

async function login(email, password) {
    const user = await User.findOne({email}).collation({ locale: 'en' , strength: 2});
    if(!user) {
        throw new Error('Username or password is incorrect!');
    };

    const match = await bcrypt.compare(password , user.hashedPassword);

    if(!match) {
        throw new Error("Username or password is incorrect!");
    };

    return {
        id: user._id,
        username: user.username,
        email,
        roles: user.roles
    }
};

async function getUser(userId) {
    return await User.findById(userId);
}

module.exports = {
    login,
    register,
    getUser
}