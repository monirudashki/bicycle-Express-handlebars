const { getMyBicycles, getMyOrderedBicycles } = require('../services/bicycleService');

const profileController = require('express').Router();


profileController.get('/' , async (req , res) => {
    const username = req.user.username;
    const email = req.user.email;

    const bicycles = await getMyBicycles(req.user.id);

    res.render('profile' , {
        title: "Profile Page",
        user: {
            username,
            email
        },
        bicycles
    });
});

profileController.get('/card' , async (req , res) => {
    const username = req.user.username;
    const email = req.user.email;

    const bicycles = await getMyOrderedBicycles(req.user.id);

    res.render('myCard' , {
        title: "myCard Page",
        user: {
            username,
            email
        },
        bicycles
    });
});

module.exports = profileController;