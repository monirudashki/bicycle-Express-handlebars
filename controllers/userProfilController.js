const Bicycle = require('../models/Bicycle');
const { getUser } = require('../services/authServise');
const { getBicycleById, getMyBicycles } = require('../services/bicycleService');

const userProfilController = require('express').Router();

userProfilController.get('/:id' , async (req , res) => {
    const bicycle = await getBicycleById(req.params.id);
    let userId = bicycle.owner;

    const userProfile = await getUser(userId);
    const username = userProfile.username;
    const email = userProfile.email;

    userId = userId.toString();

    const bicycles = await getMyBicycles(userId);

    res.render('profile' , {
        title: "Profile Page",
        user: {
            username,
            email,
            phone: '+3590877757766',
        },
        bicycles,

    });
})

module.exports = userProfilController;